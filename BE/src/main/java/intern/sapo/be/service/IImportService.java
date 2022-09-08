package intern.sapo.be.service;

import intern.sapo.be.dto.response.ImportInvoice.DetailsImportsInvoiceResponse;
import intern.sapo.be.dto.response.ImportInvoice.DetailsReturnImportResponse;
import intern.sapo.be.dto.response.ImportInvoice.ImportResponse;
import intern.sapo.be.dto.response.ImportInvoice.ReturnImportInvoiceResponse;
import intern.sapo.be.entity.Import;

import java.util.List;

public interface IImportService {

    List<Import> findAll();

    List<ImportResponse> findAllImportDTO(String searchValue);

    Import save(Import importField);

    void updateStatusImport(Integer importId, String chooses);

    void updateStatusImportReturn(Integer importId, String chooses);

    DetailsImportsInvoiceResponse getDetailInvoiceByCode(String code);

    List<DetailsReturnImportResponse> getAllReturnImport(String code);

    List<ReturnImportInvoiceResponse> getDetailsReturnImport(String code);
}
