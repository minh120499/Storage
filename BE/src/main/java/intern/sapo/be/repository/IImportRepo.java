package intern.sapo.be.repository;

import intern.sapo.be.entity.Import;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImportRepo extends JpaRepository<Import, Long> {
}
