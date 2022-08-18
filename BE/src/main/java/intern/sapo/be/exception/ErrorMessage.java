package intern.sapo.be.exception;

import lombok.*;
import org.springframework.http.HttpStatus;
import java.util.List;
@Data
@ToString
@Builder
@AllArgsConstructor
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
