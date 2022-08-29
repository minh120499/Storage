package intern.sapo.be.controller;

import intern.sapo.be.entity.Import;
import intern.sapo.be.service.IDetailsImportService;
import intern.sapo.be.service.IImportService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/imports")
@CrossOrigin("*")
public class ImportController {

    private final IImportService importService;

    private final IDetailsImportService detailsImportService;

    @PostMapping
    public Import save(@RequestBody Import im) {
        Import anImport = importService.save(im);
        detailsImportService.save(im.getDetailsImports(), anImport.getId());
        return anImport;
    }

    @GetMapping
    public List<Import> findAll() {
        return importService.findAll();
    }
}
