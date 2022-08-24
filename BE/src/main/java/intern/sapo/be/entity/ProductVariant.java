package intern.sapo.be.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product_variants")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class ProductVariant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Integer id;

	@Column(name = "code", nullable = false, length = 100)
	private String code;

	@JoinColumn(name = "product_id", nullable = false)
	private Integer productId;

	@Column(name = "name", nullable = false, length = 200)
	private String name;

    @Lob
    @Column(name = "image")
    private String image;



	@Column(name = "wholesale_price", nullable = false, precision = 20, scale = 2,columnDefinition = " default (0)")
	private BigDecimal wholesalePrice;

	@Column(name = "sale_price", nullable = false, precision = 20, scale = 2,columnDefinition = " default (0)")
	private BigDecimal salePrice;
	@Column(name = "import_price", nullable = false, precision = 20, scale = 2,columnDefinition = " default (0)")
	private BigDecimal importPric;

}