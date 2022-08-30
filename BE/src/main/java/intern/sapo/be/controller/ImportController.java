package intern.sapo.be.controller;

import intern.sapo.be.entity.DetailsImport;
import intern.sapo.be.entity.Import;
import intern.sapo.be.service.IDetailsImportService;
import intern.sapo.be.service.IImportService;
import intern.sapo.be.service.IInventoriesProductVariantService;
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

    private final IInventoriesProductVariantService inventoriesProductVariantService;

    @PostMapping()
    public Import save(@RequestBody Import im) {
        Import anImport = importService.save(im);
        List<DetailsImport> list = detailsImportService.save(im.getDetailsImports(), anImport.getId());
        inventoriesProductVariantService.importProductVariantToInventory(list, im.getInventoryId());
        return anImport;
    }

    @GetMapping
    public List<Import> findAll() {
        return importService.findAll();
    }
}
