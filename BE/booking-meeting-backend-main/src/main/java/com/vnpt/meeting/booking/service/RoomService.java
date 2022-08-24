package com.vnpt.meeting.booking.service;

import com.vnpt.meeting.booking.dto.PageDto;
import com.vnpt.meeting.booking.dto.RoomDto;
import com.vnpt.meeting.booking.entity.Booking;
import com.vnpt.meeting.booking.entity.Room;
import com.vnpt.meeting.booking.entity.payload.RoomRequest;
import com.vnpt.meeting.booking.exception.ResourceNotFoundException;
import com.vnpt.meeting.booking.repository.BookingRepository;
import com.vnpt.meeting.booking.repository.RoomRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService extends AbstractService<Room, Long> {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BookingRepository bookingRepository;

    public RoomService() { }

    @Override
    protected JpaRepository<Room, Long> getRepository() {
        return roomRepository;
    }

    public PageDto<RoomDto> getList(String name, Integer page, Integer pageSize) {
        PageRequest pageRequest;
        if (page == null || pageSize == null) {
            pageRequest = PageRequest.of(0, Integer.MAX_VALUE, Sort.Direction.ASC, "id");
        } else {
            pageRequest = PageRequest.of(page - 1, pageSize, Sort.Direction.ASC, "id");
        }
        Page<Room> rooms = roomRepository.getList(name, pageRequest);

        return setPageDto(rooms);
    }

    private PageDto<RoomDto> setPageDto(Page<Room> roomPage) {
        List<Room> rooms = roomPage.getContent();
        List<RoomDto> roomDtos= new ArrayList<>();
        rooms.forEach(room -> {
            RoomDto roomDto = convertToDto(room);
            roomDtos.add(roomDto);
        });
        return new PageDto<>(roomPage, roomDtos);
    }

    public RoomDto convertToDto(Room room) {
        RoomDto roomDto = new RoomDto();
        roomDto.setId(room.getId());
        roomDto.setName(room.getName());
        roomDto.setArea(room.getArea());
        roomDto.setIsProjector(room.getIsProjector());
        roomDto.setIsWater(room.getIsWater());
        roomDto.setTotalPerson(room.getTotalPerson());
        roomDto.setCreateDate(room.getCreatedDate());
        roomDto.setModifiedDate(room.getModifiedDate());
        return roomDto;
    }

    public List<Room> getRooms() {
        return roomRepository.findAll();
    }

    public void deleteRoom(Long roomId) {
        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();
            roomRepository.delete(room);
            List<Optional<Booking>> bookingsOP = bookingRepository.findByRoomId(roomId);
            bookingsOP.forEach(bookingOP -> {
                if (bookingOP.isPresent()) {
                    Booking booking = bookingOP.get();
                    booking.setCreateByUser(null);
                    bookingRepository.delete(booking);
                }
            });
        } else {
            throw new ResourceNotFoundException("Phòng họp", "ID", String.valueOf(roomId));
        }
    }

    public void updateRoom(RoomRequest roomRequest) {
        Optional<Room> roomOptional = roomRepository.findById(roomRequest.getRoomId());
        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();
            room.setArea(roomRequest.getArea());
            room.setName(roomRequest.getRoomName());
            room.setTotalPerson(roomRequest.getTotalPerson());
            room.setIsProjector(roomRequest.getIsProjector());
            room.setIsWater(roomRequest.getIsWater());
            room.setModifiedDate(new Date());
            roomRepository.save(room);
        } else {
            throw new ResourceNotFoundException("Phòng họp", "ID", String.valueOf(roomRequest.getRoomId()));
        }
    }

    private final static SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy HH:mm");
    private final static Logger LOGGER = LoggerFactory.getLogger(RoomService.class);

}
