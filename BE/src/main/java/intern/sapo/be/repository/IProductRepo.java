package intern.sapo.be.repository;

import intern.sapo.be.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepo extends JpaRepository<Product,Integer> {
    @Query(value = "select * from  products  order by id DESC limit 1",nativeQuery = true)
    Product getTop();

}
