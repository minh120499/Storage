package com.vnpt.meeting.booking.repository.basic;

import com.vnpt.meeting.booking.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepositoryBasic {
    Page<Booking> getBooking(@Param("title") String title,
                             @Param("fromDate") String fromDate,
                             @Param("toDate") String toDate,
                             @Param("memberId") Long memberId,
                             @Param("roomId") Long roomId,
                             @Param("createByUserId") Long createByUserId,
                             @Param("status") Integer status,
                             @Param("priority") Integer priority,
                             PageRequest pageRequest);
}
