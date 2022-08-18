package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class TransportCompaniesDTO {
    private Integer id;
    private String code;
    private String name;
    private String email;
    private String phone;
    private String address;
    private Integer accountId;
    private java.sql.Timestamp createAt;
    private java.sql.Timestamp updateAt;
    private Boolean isDelete;


}
