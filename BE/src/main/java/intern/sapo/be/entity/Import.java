package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "imports")
@Getter
@Setter
public class Import {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    private Integer transport_company_id;

    @JoinColumn(name = "account_id", insertable = false, updatable = false, nullable = false)
    private Integer accountId;

    @Column(name = "total_price", nullable = false, precision = 20, scale = 2, columnDefinition = " default (0)")
    private BigDecimal totalPrice;

    @Column(name = "note", nullable = false, length = 250)
    private String note;

    @Column(name = "code", nullable = false, length = 50)
    @Size(max = 100, message = "code can not be more then 50 character")
    private String code;


    @OneToMany(mappedBy = "anImport", cascade = CascadeType.ALL)
    private List<DetailsImport> detailsImports;
}