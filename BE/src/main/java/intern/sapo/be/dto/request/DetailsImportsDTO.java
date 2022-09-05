package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class DetailsImportsDTO {
    private Integer id;
    private Integer importId;
    private Integer productVariantId;
    private Integer quantity;


}
