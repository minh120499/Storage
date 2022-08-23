package com.vnpt.meeting.booking.controller;

import com.vnpt.meeting.booking.annotation.CurrentUser;
import com.vnpt.meeting.booking.dto.BookingDto;
import com.vnpt.meeting.booking.entity.payload.ApiResponse;
import com.vnpt.meeting.booking.entity.payload.BookingRequest;
import com.vnpt.meeting.booking.exception.BadRequestException;
import com.vnpt.meeting.booking.exception.ResourceNotFoundException;
import com.vnpt.meeting.booking.security.service.UserDetailsImpl;
import com.vnpt.meeting.booking.service.BookingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@Api(tags = "BookingService", description = "Defines endpoints for Booking. It's secured by default")
public class BookingController {

    private final BookingService bookingService;
    private final RedisTemplate<String, Object> redisTemplate;

    public BookingController(BookingService bookingService, RedisTemplate<String, Object> redisTemplate) {
        this.bookingService = bookingService;
        this.redisTemplate = redisTemplate;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @ApiOperation(value = "Đặt lịch họp, phòng họp mới")
    public ResponseEntity<?> booking(@CurrentUser UserDetailsImpl userDetails, @Valid @RequestBody BookingRequest bookingRequest) {
        bookingService.createBooking(userDetails, bookingRequest);
        LOGGER.info("Booking successfully with booking request {}", bookingRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Đặt phòng họp thành công !"));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @ApiOperation(value = "Tìm kiếm phòng họp")
    public ResponseEntity<?> getBookings(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "roomId", required = false) Long roomId,
            @RequestParam(value = "createByUserId", required = false) Long createByUserId,
            @RequestParam(value = "memberId", required = false) Long memberId,
            @RequestParam(value = "fromDate", required = false) String fromDate,
            @RequestParam(value = "status", required = false) Integer status,
            @RequestParam(value = "priority", required = false) Integer priority,
            @RequestParam(value = "toDate", required = false) String toDate,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "limit", required = false) Integer limit
    ) {
        return ResponseEntity.ok(bookingService.getBookings(title, roomId, createByUserId, memberId, fromDate, toDate, page, limit, status, priority));
    }

    @GetMapping("/list")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @ApiOperation(value = "Lấy toàn bộ danh sách phòng họp")
    public ResponseEntity<?> getAllBookings(@RequestParam(value = "status", required = false) Integer status) {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @ApiOperation(value = "Lấy chi tiết phòng họp theo id")
    @GetMapping("/{bookingId}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> getBooking(@PathVariable("bookingId") Long bookingId) {
        return bookingService.getBooking(bookingId)
                .map(booking -> {
                    BookingDto bookingDto = bookingService.convertToDto(booking);
                    return ResponseEntity.ok(bookingDto);
                }).orElseThrow(() -> new ResourceNotFoundException("Booking", "ID", bookingId.toString()));
    }

    @ApiOperation(value = "Xóa dữ liệu đặt phòng họp")
    @DeleteMapping("/{bookingId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> deleteBooking(@PathVariable("bookingId") Long bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.ok(new ApiResponse(true, "Xoá lịch họp thành công!"));
    }

    @ApiOperation(value = "Cập nhật trạng thái đặt lịch")
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PatchMapping("/update-status/{bookingId}")
    public ResponseEntity<?> updateStatus(@PathVariable("bookingId") Long bookingId, @RequestBody Map<String, Object> updates) {

        if (bookingId == null) {
            throw new BadRequestException("Id đặt lịch không được để trống");
        }
        double doubleStatus = Double.parseDouble(updates.get("status").toString());
        Integer newStatus = (int) doubleStatus;
        bookingService.updateStatus(bookingId, newStatus);
        return ResponseEntity.ok(new ApiResponse(true, "Cập nhật trạng thái phòng họp thành công!"));
    }

    @ApiOperation(value = "Cập nhật thông tin đặt lịch họp")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<?> updateBooking(@CurrentUser UserDetailsImpl userDetails, @Valid @RequestBody BookingRequest bookingRequest) {
        bookingService.updateBooking(userDetails, bookingRequest);
        LOGGER.info("Update booking successfully with booking update request: {}", bookingRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Cập nhật thông tin đặt lịch thành công!"));
    }

    private final static Logger LOGGER = LoggerFactory.getLogger(BookingController.class);
}
