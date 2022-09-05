package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@AllArgsConstructor
@Data
public class ImportDTO {
    private String code;
    private String supplierName;
    private String inventoryName;
    private BigDecimal totalPrice;
    private Boolean isDone;
    private Boolean isPaid;
    private Boolean isImport;
    private Boolean isReturn;
    private String userName;
}
