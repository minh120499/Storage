package intern.sapo.be.dto.response.product;

import intern.sapo.be.entity.Product;
import intern.sapo.be.entity.ProductVariant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductReponse {
    private Product product;
    private List<ProductVariant> variants;
}
