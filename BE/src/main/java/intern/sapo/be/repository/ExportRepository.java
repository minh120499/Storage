package intern.sapo.be.repository;

import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.Export;
import org.springframework.stereotype.Repository;

@Repository
public interface ExportRepository extends IBaseRepo<Export, Integer> {
}
