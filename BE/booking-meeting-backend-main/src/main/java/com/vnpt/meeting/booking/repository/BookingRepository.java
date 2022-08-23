package com.vnpt.meeting.booking.repository;

import com.vnpt.meeting.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query(value = "SELECT count(*) FROM booking b WHERE b.room_id=:roomId and b.status = 1 and ((b.start_time <= :fromDate and :fromDate < b.end_time) or (b.start_time < :endDate and :endDate <= b.end_time))",
            nativeQuery = true)
    Long checkExistBookingInTime(@Param("roomId") Long roomId, @Param("fromDate") Date fromDate, @Param("endDate") Date endDate);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE booking b set b.status= :status WHERE b.id= :bookingId", nativeQuery = true)
    @Transactional
    void updateStatus(@Param("bookingId") Long bookingId, @Param("status") int status);

    List<Optional<Booking>> findByRoomId(Long roomId);

}
