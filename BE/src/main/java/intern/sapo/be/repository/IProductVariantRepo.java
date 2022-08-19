package intern.sapo.be.repository;

import intern.sapo.be.entity.Product;
import intern.sapo.be.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IProductVariantRepo extends JpaRepository<ProductVariant,Integer> {
    @Query(value = "select * from  products_variants  order by id DESC limit 1",nativeQuery = true)
    Product getTop();
}
