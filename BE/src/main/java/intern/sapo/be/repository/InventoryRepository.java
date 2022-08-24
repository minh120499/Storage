package intern.sapo.be.repository;

import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.Inventory;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends IBaseRepo<Inventory, Integer> {
}
