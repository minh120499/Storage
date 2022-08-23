package com.vnpt.meeting.booking.dto;

import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomDto implements Serializable {
    private Long id;

    private String name;

    private String area;

    private Integer totalPerson;

    private Boolean isProjector;

    private Boolean isWater;

    private Date createDate;

    private Date modifiedDate;
}
