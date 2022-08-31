package intern.sapo.be.service;

import intern.sapo.be.entity.ImportsStatus;

public interface IImportsStatusService {

    ImportsStatus save(ImportsStatus importsStatus);

    List<>

    ImportsStatus findByImportIdAndStatusId(Integer importId, Integer statusId);
}
