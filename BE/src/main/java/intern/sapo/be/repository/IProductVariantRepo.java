package intern.sapo.be.repository;

import intern.sapo.be.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductVariantRepo extends JpaRepository<ProductVariant,Integer> {
}
