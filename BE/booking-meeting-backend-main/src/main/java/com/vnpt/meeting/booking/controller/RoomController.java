package com.vnpt.meeting.booking.controller;

import com.vnpt.meeting.booking.entity.Room;
import com.vnpt.meeting.booking.entity.payload.ApiResponse;
import com.vnpt.meeting.booking.entity.payload.RoomRequest;
import com.vnpt.meeting.booking.service.RoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Api(tags = "RoomService", description = "Định nghĩa các api liên quan đến quản lý phòng họp")
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @ApiOperation(value = "API lấy danh sách phòng họp")
    public ResponseEntity<?> getRooms(@RequestParam(name = "page", required = false) Integer page,
                                      @RequestParam(name = "limit", required = false) Integer limit,
                                      @RequestParam(name = "name", required = false) String name) {
        return ResponseEntity.ok(roomService.getList(name, page, limit));
    }

    @GetMapping("/list")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @ApiOperation(value = "API lấy toàn bộ phòng họp")
    public ResponseEntity<?> getRooms() {
        return ResponseEntity.ok(roomService.getRooms());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @ApiOperation(value = "API lấy phòng họp theo id")
    public ResponseEntity<?> getRooms(@PathVariable(name = "id") String id) {
        Long roomId = Long.parseLong(id);
        Room room = roomService.get(roomId);
        return ResponseEntity.ok(room);
    }

    @ApiOperation(value = "API xóa phòng họp")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable(name = "roomId") Long roomId) {
        roomService.deleteRoom(roomId);
        return ResponseEntity.ok(new ApiResponse(true, "Xoá phòng họp thành công!"));
    }

    @ApiOperation(value = "API tạo mới phòng họp")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createRoom(@Valid @RequestBody Room room) {
        LOGGER.info("Room: " + room);
        Room newRoom = roomService.save(room);
        return ResponseEntity.ok(newRoom);
    }

    @ApiOperation(value = "API cập nhật thông tin phòng họp")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<?> updateRoom(@Valid @RequestBody RoomRequest roomRequest) {
        LOGGER.info("Room request update is {}", roomRequest);
        roomService.updateRoom(roomRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Cập nhật thông tin phòng họp thành công!"));
    }

    private final static Logger LOGGER = LoggerFactory.getLogger(RoomController.class);
}
