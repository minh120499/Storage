package intern.sapo.be.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.ExportsStatus;

@Repository
public interface ExportStatusRepository extends IBaseRepo<ExportsStatus, Integer> {
    ExportsStatus findByExport(Integer export);
}
