package intern.sapo.be.repository;

import intern.sapo.be.entity.TransportCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITransportCompaniesRepo extends JpaRepository<TransportCompany,Integer> {
}
