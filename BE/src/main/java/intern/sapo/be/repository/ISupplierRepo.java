package intern.sapo.be.repository;


import intern.sapo.be.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ISupplierRepo extends JpaRepository<Supplier,Integer> {
    Optional<Supplier> findByPhone(String phone);
    Optional<Supplier> findByEmail(String email);
    Optional<Supplier> findByCode(String code);
}
