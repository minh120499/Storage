package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductVariantsDTO {
    private Integer id;
    private String code;
    private Integer productId;
    private String name;
    private String image;
    private BigDecimal wholesalePrice;
    private BigDecimal salePrice;
    private BigDecimal importPrice;
    private Integer quantity;

}
