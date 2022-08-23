package com.vnpt.meeting.booking.entity.payload;

import com.vnpt.meeting.booking.validation.annotation.NullOrNotBlank;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@ApiModel(value = "Tạo mới lịch họp", description = "Payload dùng để tạo mới lịch họp")
public class BookingRequest implements Serializable {

    @ApiModelProperty(value = "Booing Id", dataType = "Long", required = false)
    private Long bookingId;

    @NotBlank(message = "Tiêu đề lịch họp không được để trống !")
    @ApiModelProperty(value = "Tiêu đề lịch họp", dataType = "string", allowableValues = "Non empty string")
    private String title;

    @ApiModelProperty(value = "Phòng họp", dataType = "Long", required = true)
    @NotNull(message = "Hãy chọn phòng họp!")
    private Long roomId;

    @ApiModelProperty(value = "Thời gian bắt đầu", dataType = "Date", required = true)
    @NotNull(message = "Hãy nhập thời gian bắt đầu")
    private String startTime;

    @ApiModelProperty(value = "Thời gian kết thúc", dataType = "Date", required = true)
    @NotNull(message = "Hãy nhập thời gian kết thúc")
    private String endTime;

    @ApiModelProperty(value = "Mô tả nội dung cuộc họp", dataType = "Date", allowableValues = "Non empty string")
    @NullOrNotBlank(message = "Hãy nhập mô tả chi tiết nội dung cuộc họp")
    private String description;

    @ApiModelProperty(value = "Người tạo lịch họp", dataType = "Long", required = true)
    @NotNull(message = "Hãy chọn người tạo lịch họp")
    private Long creatByUserId;

    @ApiModelProperty(value = "Thông báo đến các thành viên về cuộc họp", dataType = "Boolean", required = true)
    @NotNull(message = "Hãy cấu hình thông báo đến các thành viên cuộc họp")
    private Boolean isNotification;

    @NullOrNotBlank(message = "Danh sách thành viên tham gia không được để trống")
    @ApiModelProperty(value = "Danh sách thành viên", dataType = "String", allowableValues = "Non empty string")
    private String members;

    @ApiModelProperty(value = "Độ ưu tiên của lịch họp", dataType = "Integer", required = true)
    @NotNull(message = "Độ ưu tiên của lịch họp không được trống")
    private Integer priority;

}
