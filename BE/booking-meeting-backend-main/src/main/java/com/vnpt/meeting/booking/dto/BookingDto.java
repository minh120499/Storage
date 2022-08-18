package com.vnpt.meeting.booking.dto;

import com.vnpt.meeting.booking.constant.BookingStatus;
import com.vnpt.meeting.booking.constant.Priority;
import com.vnpt.meeting.booking.entity.Room;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class BookingDto implements Serializable {
    private Long id;
    private String title;
    private Room room;
    private Date startTime;
    private Date endTime;
    private String description;
    private UserDto createByUser;
    private Boolean isNotification;
    private List<UserDto> members;
    private Date createdDate;
    private Date modifiedDate;
    private BookingStatus status;
    private Priority priority;
}
