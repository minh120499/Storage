package intern.sapo.be.service.impl;

import intern.sapo.be.entity.Import;
import intern.sapo.be.entity.ImportsStatus;
import intern.sapo.be.repository.IImportRepo;
import intern.sapo.be.repository.IStatusRepo;
import intern.sapo.be.service.IImportService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
@AllArgsConstructor
public class ImportService implements IImportService {

    private final IImportRepo importRepo;

    private final ImportStatusService importStatusService;

    private final IStatusRepo statusRepo;

    @Override
    public List<Import> findAll() {
        return importRepo.findAll();
    }

    @Override
    public Import save(Import importField) {
        Import anImport = importRepo.save(importField);
        ImportsStatus importsStatus = new ImportsStatus();
        importsStatus.setImportId(anImport.getId());
        importsStatus.setStatusId(statusRepo.findByCode("IMPORT01").getId());
        importsStatus.setCreateAt(Timestamp.from(Instant.now()));
        importStatusService.save(importsStatus);
        return anImport;
    }
}
