package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class InventoiesProductVariantDTO {
    private Integer inventoryId;
    private Integer productVariantId;
    private Integer qantity;

}
