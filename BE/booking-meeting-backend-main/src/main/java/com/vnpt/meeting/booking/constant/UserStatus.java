package com.vnpt.meeting.booking.constant;

public enum UserStatus {
    ACTIVE(0),
    LOCK(1);

    private final Integer value;

    UserStatus(Integer value) {
        this.value = value;
    }

    public Integer getValue() {
        return value;
    }
}
