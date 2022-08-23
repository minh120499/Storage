package com.vnpt.meeting.booking.entity.payload;

import com.vnpt.meeting.booking.validation.annotation.NullOrNotBlank;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@ApiModel(value = "Tạo mới phòng ban", description = "Payload dùng để tạo mới phòng ban")
public class RoomRequest implements Serializable {

    @ApiModelProperty(value = "Id phòng họp", dataType = "Long", required = true)
    @NotNull(message = "Id phòng họp không thể để trống")
    private Long roomId;

    @ApiModelProperty(value = "Tên phòng họp", dataType = "String", required = true)
    @NotBlank(message = "Tên phòng họp không thể để trống")
    private String roomName;

    @ApiModelProperty(value = "Diện tích phòng họp", dataType = "String", required = true)
    @NullOrNotBlank(message = "Diện tích của phòng họp không thể thiếu")
    private String area;

    @ApiModelProperty(value = "Tổng số người tham gia trong phòng họp", dataType = "Integer", required = true)
    @NotNull(message = "Tổng số người tham gia không được để trống")
    private Integer totalPerson;

    @ApiModelProperty(value = "Có phải là người trình chiếu", dataType = "Boolean", required = true)
    @NotNull(message = "Là người trình chiếu hay không")
    private Boolean isProjector;

    @ApiModelProperty(value = "Có nước hay không", dataType = "Boolean", required = true)
    @NotNull(message = "Có nước hay không")
    private Boolean isWater;
}
