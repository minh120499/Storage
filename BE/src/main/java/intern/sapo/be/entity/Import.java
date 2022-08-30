package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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


    @JoinColumn(name = "account_id", insertable = false, updatable = false, nullable = false)
    private Integer accountId;

    @JoinColumn(name = "supplier_id", nullable = false)
    @NotNull(message = "supplierId can not be null")
    private Integer supplierId;

    @JoinColumn(name = "inventory_id", nullable = false)
    @NotNull(message = "inventoryId can not be null")
    private Integer inventoryId;


    @Column(name = "total_price", nullable = false, precision = 20, scale = 2, columnDefinition = " default (0)")
    private BigDecimal totalPrice;

    @Column(name = "note", nullable = false, length = 250)
    private String note;

    @Column(name = "code", nullable = false, length = 50)
    @Size(max = 100, message = "code can not be more then 50 character")
    private String code;


    @Column(name = "is_done")
    private Boolean isDone = false;

    @Column(name = "is_paid")
    private Boolean isPaid = false;

    @Column(name = "is_import")
    private Boolean isImport = false;


    @OneToMany(mappedBy = "anImport", cascade = CascadeType.ALL)
    private List<DetailsImport> detailsImports;
}