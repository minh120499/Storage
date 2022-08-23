package intern.sapo.be.repository;

import intern.sapo.be.entity.Product;
import intern.sapo.be.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductVariantRepo extends JpaRepository<ProductVariant,Integer> {
    @Query(value = "select * from  product_variants  order by id DESC limit 1",nativeQuery = true)
    ProductVariant getTop();

    @Query("select p from ProductVariant p where p.productId = :id")
    List<ProductVariant> findAllByProductId(@Param("id") Integer id);
}
