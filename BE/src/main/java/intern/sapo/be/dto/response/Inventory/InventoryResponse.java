package intern.sapo.be.dto.response.Inventory;

import intern.sapo.be.dto.request.ProductVariantsDTO;
import intern.sapo.be.entity.Inventory;
import intern.sapo.be.entity.ProductVariant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class InventoryResponse {
    private Inventory inventory;
    private List<ProductVariantsDTO> productVariantsDTOS;
}
