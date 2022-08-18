package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "inventoies_product_variant")
@Getter
@Setter
public class InventoiesProductVariant {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EmbeddedId
    private InventoiesProductVariantId id;

    @MapsId("inventoryId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "inventory_id", nullable = false)
    private Inventory inventory;

    @MapsId("productVariantId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_variant_id", nullable = false)
    private ProductVariant productVariant;

    @Column(name = "qantity", nullable = false)
    private Integer qantity;



}