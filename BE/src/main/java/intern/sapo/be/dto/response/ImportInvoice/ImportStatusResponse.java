package intern.sapo.be.dto.response.ImportInvoice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ImportStatusResponse {
    private String accountName;
    private String statusName;
    private String statusDesc;
    private String createdAt;
}
