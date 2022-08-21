package intern.sapo.be.service.impl;

import intern.sapo.be.base.BaseService;
import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.Export;
import intern.sapo.be.service.IExportService;
import org.springframework.stereotype.Service;

@Service
public class ExportServiceImpl extends BaseService<Export> implements IExportService {

    public ExportServiceImpl(IBaseRepo<Export, Integer> baseRepo) {
        super(baseRepo);
    }
}
