package intern.sapo.be.service.impl;

import intern.sapo.be.entity.ImportsStatus;
import intern.sapo.be.repository.IImportStatusRepo;
import intern.sapo.be.service.IImportsStatusService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImportStatusService implements IImportsStatusService {

    private final IImportStatusRepo importStatusRepo;

    @Override
    public ImportsStatus save(ImportsStatus importsStatus) {
        return importStatusRepo.save(importsStatus);
    }
}
