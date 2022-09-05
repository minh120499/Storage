package intern.sapo.be.controller;

import intern.sapo.be.dto.response.ImportInvoice.DetailsImportsInvoiceResponse;
import intern.sapo.be.dto.response.ImportInvoice.ImportResponse;
import intern.sapo.be.entity.DetailsImport;
import intern.sapo.be.entity.Import;
import intern.sapo.be.service.IDetailsImportService;
import intern.sapo.be.service.IImportService;
import intern.sapo.be.service.IImportsStatusService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/imports")
@CrossOrigin("*")
public class ImportController {

    private final IImportService importService;
    private final IImportsStatusService importsStatusService;

    private final IDetailsImportService detailsImportService;

    @PostMapping()
    public Import save(@RequestBody Import im) {
        Import anImport = importService.save(im);
        List<DetailsImport> list = detailsImportService.save(im.getDetailsImports(), anImport.getId());
        return anImport;
    }

    @GetMapping
    public List<Import> findAll() {
        return importService.findAll();
    }

    @GetMapping("/findAll")
    private List<ImportResponse> findAllDTO() {
        return importService.findAllImportDTO();
    }

    @GetMapping("/getDetails/{code}")
    private DetailsImportsInvoiceResponse getDetails(@PathVariable String code) {
        return importService.getDetailInvoiceByCode(code);
    }

    @PutMapping("/updateStatus")
    private void updateStatus(@RequestParam Integer id, @RequestParam String status) {
        importService.updateStatusImport(id, status);
    }

    @PutMapping("/updateStatusReturn")
    private void updateStatusReturn(@RequestParam Integer id, @RequestParam String status) {
        importService.updateStatusImportReturn(id, status);
    }

    @GetMapping("/getStatusHistory/{importId}")
    private ResponseEntity<?> updateStatus(@PathVariable Integer importId) {
        return ResponseEntity.ok(importsStatusService.findDetailsImportStatus(importId));
    }

    @GetMapping("/getReturnImport/{code}")
    private ResponseEntity<?> getAllReturnImport(@PathVariable String code) {
        return ResponseEntity.ok(importService.getAllReturnImport(code));
    }

    @GetMapping("/getDetailsReturnImport/{code}")
    private ResponseEntity<?> getDetailsReturn(@PathVariable String code) {
        return ResponseEntity.ok(importService.getDetailsReturnImport(code));
    }
}
