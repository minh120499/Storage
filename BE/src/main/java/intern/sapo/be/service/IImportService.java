package intern.sapo.be.service;

import intern.sapo.be.entity.Import;

import java.util.List;

public interface IImportService {

    List<Import> findAll();

    Import save(Import importField);

}
