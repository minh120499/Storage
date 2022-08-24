package com.vnpt.meeting.booking.repository.basic;

import com.vnpt.meeting.booking.entity.UserEntity;
import io.swagger.models.auth.In;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositoryBasic {
    Page<UserEntity> getUsers(@Param("name") String name,
                              @Param("status") Integer status,
                              @Param("mobile") String mobile,
                              @Param("email") String email,
                              @Param("departmentId") Long departmentId,
                              @Param("fromDate") String fromDate,
                              @Param("toDate") String toDate,
                              PageRequest pageRequest);
}
