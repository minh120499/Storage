package com.vnpt.meeting.booking.entity;

import com.vnpt.meeting.booking.validation.annotation.NullOrNotBlank;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;
import java.util.Objects;


@Entity
@Table(name = "room")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "Create Room Request", description = "The registration request payload")
public class Room extends AbstractModel<Long> {

    @Column(name = "name")
    @NullOrNotBlank(message = "Room name can't null or blank")
    @ApiModelProperty(value = "A valid room name", allowableValues = "NonEmpty String")
    private String name;
    @NullOrNotBlank(message = "Area of room can't null or blank")
    @ApiModelProperty(value = "A valid area of room", allowableValues = "NonEmpty String")
    @Column(name = "area")
    private String area;
    @Column(name = "total_person")
    @ApiModelProperty(value = "Total person of room", allowableValues = "NonEmpty String")
    private int totalPerson;
    @ApiModelProperty(value = "Room have projector", allowableValues = "NonEmpty String")
    @Column(name = "is_projector")
    private Boolean isProjector;
    @ApiModelProperty(value = "Room have water", allowableValues = "NonEmpty String")
    @Column(name = "is_water")
    private Boolean isWater;
    @Column(name = "created_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", insertable = false, updatable = false)
    private Date createdDate;
    @Column(name = "modified_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date modifiedDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Room room = (Room) o;
        return getId() != null && Objects.equals(getId(), room.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
