package intern.sapo.be.repository;

import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.ProductVariant;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductVariantsRepository extends IBaseRepo<ProductVariant, Integer> {
    @Query(value = "SELECT * FROM product_variants WHERE NAME LIKE %?%", nativeQuery = true)
    List<ProductVariant> findProductVariantByName(String name);

}
