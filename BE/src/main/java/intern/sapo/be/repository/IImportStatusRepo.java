package intern.sapo.be.repository;

import intern.sapo.be.entity.ImportsStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IImportStatusRepo extends JpaRepository<ImportsStatus, Integer> {
}
