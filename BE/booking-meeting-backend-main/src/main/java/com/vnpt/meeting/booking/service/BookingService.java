package com.vnpt.meeting.booking.service;

import com.vnpt.meeting.booking.constant.BookingStatus;
import com.vnpt.meeting.booking.constant.Priority;
import com.vnpt.meeting.booking.dto.BookingDto;
import com.vnpt.meeting.booking.dto.PageDto;
import com.vnpt.meeting.booking.dto.UserDto;
import com.vnpt.meeting.booking.entity.Booking;
import com.vnpt.meeting.booking.entity.Room;
import com.vnpt.meeting.booking.entity.UserEntity;
import com.vnpt.meeting.booking.entity.payload.BookingRequest;
import com.vnpt.meeting.booking.exception.BadRequestException;
import com.vnpt.meeting.booking.exception.BookingUseException;
import com.vnpt.meeting.booking.exception.ResourceNotFoundException;
import com.vnpt.meeting.booking.repository.BookingRepository;
import com.vnpt.meeting.booking.repository.basic.BookingRepositoryImpl;
import com.vnpt.meeting.booking.security.service.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class BookingService extends AbstractService<Booking, Long> {

    private final BookingRepository bookingRepository;
    private final UserService userService;
    private final RoomService roomService;
    private final BookingRepositoryImpl bookingRepositoryImpl;

    public BookingService(BookingRepository bookingRepository, UserService userService, RoomService roomService, BookingRepositoryImpl bookingRepositoryImpl) {
        this.bookingRepository = bookingRepository;
        this.userService = userService;
        this.roomService = roomService;
        this.bookingRepositoryImpl = bookingRepositoryImpl;
    }

    @Override
    protected JpaRepository<Booking, Long> getRepository() {
        return bookingRepository;
    }

    public void createBooking(UserDetailsImpl userDetails, BookingRequest request) {
        Date startTime;
        Date endTime;
        try {
            startTime = DATE_FORMAT.parse(request.getStartTime());
            endTime = DATE_FORMAT.parse(request.getEndTime());
            LOGGER.info("End time {}", endTime);
        } catch (Exception e) {
            throw new BadRequestException("Thời gian bắt đầu và thời gian kết thúc không hợp lệ");
        }

        validateBookingTime(request, startTime, endTime);

        Booking booking = new Booking();
        setToEntity(request, booking, startTime, endTime, userDetails);
        if (userDetails.isAdminUser()) {
            booking.setBookingStatus(BookingStatus.ACCEPTED);
        } else {
            booking.setBookingStatus(BookingStatus.NEW);
        }
        bookingRepository.save(booking);
    }

    public void updateBooking(UserDetailsImpl userDetails, BookingRequest bookingRequest) {
        Date startTime;
        Date endTime;
        try {
            startTime = DATE_FORMAT.parse(bookingRequest.getStartTime());
            endTime = DATE_FORMAT.parse(bookingRequest.getEndTime());
        } catch (Exception e) {
            throw new BadRequestException("Thời gian bắt đầu và thời gian kết thúc không hợp lệ");
        }
        //validateBookingTime(bookingRequest, startTime, endTime);
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingRequest.getBookingId());
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            booking.setId(bookingRequest.getBookingId());
            setToEntity(bookingRequest, booking, startTime, endTime, userDetails);
            booking.setModifiedDate(new Date());
            bookingRepository.save(booking);
        } else {
            throw new ResourceNotFoundException("Lịch họp", "ID", String.valueOf(bookingRequest.getBookingId()));
        }
    }

    public void deleteBooking(Long bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            bookingRepository.delete(booking);
        } else {
            throw new ResourceNotFoundException("Lịch họp", "ID", String.valueOf(bookingId));
        }
    }

    public BookingDto convertToDto(Booking booking) {
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(booking.getId());
        bookingDto.setDescription(booking.getDescription());
        bookingDto.setEndTime(booking.getEndTime());
        bookingDto.setStartTime(booking.getStartTime());
        bookingDto.setTitle(booking.getTitle());
        bookingDto.setIsNotification(booking.isNotification());
        bookingDto.setCreatedDate(booking.getCreatedDate());
        bookingDto.setModifiedDate(booking.getModifiedDate());
        bookingDto.setStatus(booking.getBookingStatus());
        bookingDto.setPriority(booking.getPriority());
        UserDto createBy = userService.setUserDto(booking.getCreateByUser());
        bookingDto.setCreateByUser(createBy);
        Room room = roomService.get(booking.getRoomId());
        bookingDto.setRoom(room);
        String[] memberIdsArr = booking.getMembers().split(",");
        List<Long> longList = Stream.of(memberIdsArr).map(Long::valueOf).collect(Collectors.toList());
        List<UserEntity> memberList = userService.getByIds(longList);
        List<UserDto> members = new ArrayList<>();
        memberList.forEach(userEntity -> {
            members.add(userService.setUserDto(userEntity));
        });
        bookingDto.setMembers(members);
        bookingDto.setPriority(booking.getPriority());
        return bookingDto;
    }

    public Boolean checkExistBookingInTime(Long roomId, Date fromDate, Date toDate) {
        return bookingRepository.checkExistBookingInTime(roomId, fromDate, toDate) > 0;
    }

    public PageDto<BookingDto> getBookings(String title, Long roomId, Long createByUserId, Long memberId,
                                           String fromDate, String toDate, Integer page, Integer pageSize, Integer status, Integer priority) {
        PageRequest pageRequest;
        if (page == null || pageSize == null) {
            pageRequest = PageRequest.of(0, Integer.MAX_VALUE, Sort.Direction.ASC, "status");
        } else {
            pageRequest = PageRequest.of(page - 1, pageSize, Sort.Direction.ASC, "status");
        }
        Page<Booking> bookings = bookingRepositoryImpl.getBooking(title, fromDate, toDate, memberId, roomId, createByUserId, status, priority, pageRequest);
        return setPageDto(bookings);
    }

    public List<BookingDto> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        List<BookingDto> bookingDtos = new ArrayList<>();
        bookings.forEach(booking -> {
            BookingDto bookingDto = this.convertToDto(booking);
            bookingDtos.add(bookingDto);
        });
        return bookingDtos;
    }

    public void updateStatus(Long bookingId, Integer status) {
        Date currentDate = new Date();

        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            if (status == BookingStatus.ACCEPTED.ordinal()) {
                if (booking.getEndTime().compareTo(currentDate) < 0) {
                    throw new BadRequestException("Thời gian đặt của phòng họp phải bắt đầu từ ngày hôm nay");
                }
                validateBookingTime(convertToRequest(booking), booking.getStartTime(), booking.getEndTime());
            }
            bookingRepository.updateStatus(bookingId, status);
        } else {
            throw new ResourceNotFoundException("Lịch họp", "ID", String.valueOf(bookingId));
        }
    }

    public Optional<Booking> getBooking(Long bookingId) {
        return bookingRepository.findById(bookingId);
    }

    public void delete(Long bookingId) {
        if (bookingId == null) {
            throw new BadRequestException("Id booking can't not be null");
        }
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isEmpty()) {
            throw new ResourceNotFoundException("Lịch họp", "ID", String.valueOf(bookingId));
        }
        bookingRepository.deleteById(bookingId);
    }

    private PageDto<BookingDto> setPageDto(Page<Booking> bookingPage) {
        List<Booking> bookings = bookingPage.getContent();
        List<BookingDto> bookingDtos = new ArrayList<>();
        for (Booking booking : bookings) {
            BookingDto bookingDto = convertToDto(booking);
            bookingDtos.add(bookingDto);
        }
        bookingDtos.sort(Comparator.comparing(BookingDto::getStatus));
        return new PageDto<>(bookingPage, bookingDtos);
    }

    private void setToEntity(BookingRequest request, Booking booking, Date startTime, Date endTime, UserDetailsImpl userDetails) {
        booking.setTitle(request.getTitle());
        booking.setDescription(request.getDescription());
        booking.setStartTime(startTime);
        booking.setEndTime(endTime);
        booking.setNotification(request.getIsNotification());
        booking.setRoomId(request.getRoomId());
        booking.setCreateByUser(userDetails.getUserEntity());
        booking.setMembers(request.getMembers());
        booking.setPriority(Priority.getPriority(request.getPriority()));
    }

    private BookingRequest convertToRequest(Booking booking) {
        BookingRequest bookingRequest = new BookingRequest();
        bookingRequest.setBookingId(booking.getId());
        bookingRequest.setTitle(booking.getTitle());
        bookingRequest.setDescription(booking.getDescription());
        bookingRequest.setRoomId(booking.getRoomId());
        bookingRequest.setStartTime(DATE_FORMAT.format(booking.getStartTime()));
        bookingRequest.setEndTime(DATE_FORMAT.format(booking.getEndTime()));
        bookingRequest.setCreatByUserId(booking.getCreateByUser().getId());
        bookingRequest.setIsNotification(booking.isNotification());
        bookingRequest.setMembers(booking.getMembers());
        bookingRequest.setPriority(booking.getPriority().ordinal());
        return bookingRequest;
    }

    private void validateBookingTime(BookingRequest bookingRequest, Date startTime, Date endTime) {
        Long existBooking = bookingRepository.checkExistBookingInTime(bookingRequest.getRoomId(), startTime, endTime);

        if (existBooking > 0) {
            LOGGER.warn("Exist booking in time {} - {}", bookingRequest.getStartTime(), bookingRequest.getEndTime());
            String message = String.format("Không thể đặt lịch với phòng họp có Id %s với thời gian %s - %s, " +
                            "vì đã có phòng họp khác được đặt. Vui lòng phòng khác với khoảng thời gian hợp lệ",
                    bookingRequest.getRoomId().toString(), bookingRequest.getStartTime(), bookingRequest.getEndTime());
            throw new BookingUseException(message);
        }
    }

    private final static Logger LOGGER = LoggerFactory.getLogger(BookingService.class);
    private final static SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy HH:mm");
}
