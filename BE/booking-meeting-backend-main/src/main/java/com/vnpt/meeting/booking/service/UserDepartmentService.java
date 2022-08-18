package com.vnpt.meeting.booking.service;

import com.vnpt.meeting.booking.entity.UserDepartment;
import com.vnpt.meeting.booking.repository.UserDepartmentRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class UserDepartmentService extends AbstractService<UserDepartment, Long> {
    private final UserDepartmentRepository userDepartmentRepository;

    public UserDepartmentService(UserDepartmentRepository userDepartmentRepository) {
        this.userDepartmentRepository = userDepartmentRepository;
    }

    @Override
    protected JpaRepository<UserDepartment, Long> getRepository() {
        return userDepartmentRepository;
    }
}
