package intern.sapo.be.repository;

import intern.sapo.be.entity.DetailsImport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDetailImportRepo extends JpaRepository<DetailsImport, Long> {
}
