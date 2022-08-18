package com.vnpt.meeting.booking.repository;

import com.vnpt.meeting.booking.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query(value = "SELECT * FROM room WHERE (:name is null or name like %:name%)",
            countQuery = "SELECT COUNT(*) FROM room WHERE (:name is null or name like %:name%)",
            nativeQuery = true)
    Page<Room> getList(@Param("name") String name, Pageable pageable);

    @Override
    Optional<Room> findById(Long aLong);
}
