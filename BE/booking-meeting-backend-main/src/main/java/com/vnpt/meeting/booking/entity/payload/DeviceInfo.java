package com.vnpt.meeting.booking.entity.payload;

import com.vnpt.meeting.booking.constant.DeviceType;
import com.vnpt.meeting.booking.validation.annotation.NullOrNotBlank;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "Payload thiết bị", description = "Payload tạo mới thiết bị")
public class DeviceInfo {

    @NotBlank(message = "Id thiết bị không được trống")
    @ApiModelProperty(value = "Id thiết bị", required = true, dataType = "string", allowableValues = "Non empty string")
    private String deviceId;

    @NotNull(message = "Loại thiết bị không được trống")
    @ApiModelProperty(value = "Loại thiết bị Android/iOS", required = true, dataType = "string", allowableValues =
            "DEVICE_TYPE_ANDROID, DEVICE_TYPE_IOS")
    private DeviceType deviceType;

    @NullOrNotBlank(message = "Token thông báo thiết bị có thể null nhưng không thể để trống")
    @ApiModelProperty(value = "Token thông báo thiết bị", dataType = "string", allowableValues = "Non empty string")
    private String notificationToken;

    @Override
    public String toString() {
        return "DeviceInfo{" +
                "deviceId='" + deviceId + '\'' +
                ", deviceType=" + deviceType +
                ", notificationToken='" + notificationToken + '\'' +
                '}';
    }
}
