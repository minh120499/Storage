package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RolesDTO {
    private Integer id;
    private String name;
    private String description;


}
