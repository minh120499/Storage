package com.vnpt.meeting.booking.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vnpt.meeting.booking.constant.BookingStatus;
import com.vnpt.meeting.booking.constant.Priority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Table(name = "booking")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Booking extends AbstractModel<Long> {

    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "room_id", nullable = false)
    private Long roomId;
    @Column(name = "start_time", nullable = false)
    private Date startTime;
    @Column(name = "end_time", nullable = false)
    private Date endTime;
    @Column(name = "description")
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    private UserEntity createByUser;
    @Column(name = "members", nullable = false)
    private String members;
    @Column(name = "isNotification")
    private boolean isNotification;
    @Column(name = "created_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", insertable = false, updatable = false)
    private Date createdDate;
    @Column(name = "modified_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date modifiedDate;
    @Column(name = "status")
    @Enumerated(value = EnumType.ORDINAL)
    private BookingStatus bookingStatus;
    @Enumerated
    @Column(name = "priority")
    private Priority priority;
}
