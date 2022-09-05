package intern.sapo.be.repository;

import intern.sapo.be.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    @Query(value = "SELECT product_variant_id FROM inventories_product_variant where inventory_id = ?1 ;", nativeQuery = true)
    List<Integer> listId(Integer id);

    @Query(value = "select quantity from inventories_product_variant where inventory_id = ?1 and product_variant_id = ?2", nativeQuery = true)
    Integer Quantity(Integer inventoryId, Integer productvariantId);

    @Query(value = "select if(sum(ipv.quantity) >= 0,inven.size - sum(ipv.quantity),0) as total\n" +
            "from inventories inven left join inventories_product_variant ipv on inven.id = ipv.inventory_id\n" +
            "where inven.id = ?1\n" +
            "group by inven.id, inven.size", nativeQuery = true)
    Integer getCurrentQuantityInventory(Integer inventoryId);
}
