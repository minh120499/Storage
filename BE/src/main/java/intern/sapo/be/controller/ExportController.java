package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.entity.DetailsExport;
import intern.sapo.be.entity.Export;
import intern.sapo.be.service.IInventoriesProductVariantService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("exports")
public class ExportController extends BaseController<Export> {
    private final IInventoriesProductVariantService inventoriesProductVariantService;

    public ExportController(IBaseService<Export> baseService, IInventoriesProductVariantService inventoriesProductVariantService) {
        super(baseService);
        this.inventoriesProductVariantService = inventoriesProductVariantService;
    }
    @PutMapping("add/{id}")
    public void updateExportsStatus(@RequestBody @Valid List<DetailsExport> request,
                                    @PathVariable(value = "id") Integer id) {
        inventoriesProductVariantService.exportProductVariantToInventory(request, id);
    }
    @PutMapping("import/{id}")
    public void importExportsStatus(@RequestBody @Valid List<DetailsExport> request,
                                    @PathVariable(value = "id") Integer id) {
        inventoriesProductVariantService.importQuantityProductVariantToInventory(request, id);
    }
}
