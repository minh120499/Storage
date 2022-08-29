package intern.sapo.be.service.impl;

import intern.sapo.be.entity.Import;
import intern.sapo.be.entity.ImportsStatus;
import intern.sapo.be.repository.IImportRepo;
import intern.sapo.be.service.IImportService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ImportService implements IImportService {

    private final IImportRepo importRepo;

    private final ImportStatusService importStatusService;

    @Override
    public List<Import> findAll() {
        return importRepo.findAll();
    }

    @Override
    public Import save(Import importField) {
        Import anImport = importRepo.save(importField);
        ImportsStatus importsStatus = new ImportsStatus();
        importsStatus.setImportId(anImport.getId());
        importsStatus.setStatusId(1);
        importStatusService.save(importsStatus);
        return anImport;
    }
}
