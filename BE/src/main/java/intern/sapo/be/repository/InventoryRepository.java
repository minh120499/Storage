package intern.sapo.be.repository;

import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.InventoriesProductVariant;
import intern.sapo.be.entity.Inventory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    @Query(value = "select product_variant_id FROM inventories_product_variant where inventory_id = ?1 ;",nativeQuery = true)
    List<Integer> listId(Integer id);

    @Query(value = "select quantity from inventories_product_variant where inventory_id = ?1 and product_variant_id = ?2",nativeQuery = true)
    Integer Quantity(Integer inventoryId, Integer productvariantId);

    @Query(value = "select * from inventories  where is_delete = 0", nativeQuery = true)
    List<Inventory> findAll();


}
