package intern.sapo.be.repository;

import intern.sapo.be.entity.InventoriesProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IInventoriesProductVariantRepo extends JpaRepository<InventoriesProductVariant, Integer> {

    InventoriesProductVariant findByInventoryIdAndProductVariantId(Integer inventoryId, Integer productId);
}
