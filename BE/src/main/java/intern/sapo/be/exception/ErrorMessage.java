package com.example.be.exception;


import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import java.util.List;
@Data
@ToString
@Builder
@RequiredArgsConstructor
public class ErrorMessage {
    private final int status;
    private final String error;
    private final String message;
    private List<String> detailedMessages;

    public ErrorMessage(HttpStatus httpStatus, String message) {
        status = httpStatus.value();
        error = httpStatus.getReasonPhrase();
        this.message = message;
    }
}
