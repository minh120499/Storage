package intern.sapo.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "details_imports")
@Getter
@Setter
public class DetailsImport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "import_id", insertable = false, updatable = false)
    private Import anImport;
    private Integer import_id;


    @JoinColumn(name = "product_variant_id", nullable = false)
    private Integer productVariantId;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "total_price", nullable = false, precision = 20, scale = 2, columnDefinition = " default (0)")
    private BigDecimal totalPrice;


}