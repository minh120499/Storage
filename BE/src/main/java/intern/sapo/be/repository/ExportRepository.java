package intern.sapo.be.repository;

import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.Export;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExportRepository extends IBaseRepo<Export, Integer> , JpaSpecificationExecutor<Export> {

    List<Export> findAll(@Nullable Specification<Export> spec);

}
