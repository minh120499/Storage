package intern.sapo.be.repository;

import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.Supplier;
import org.springframework.stereotype.Repository;

@Repository
public interface ISupplierRepo extends IBaseRepo<Supplier,Integer> {
}
