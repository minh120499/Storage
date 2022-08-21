package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.entity.DetailsExport;
import intern.sapo.be.service.IDetailsExportService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/details")
public class DetailsController extends BaseController<DetailsExport> {
    private final IDetailsExportService service;

    public DetailsController(IBaseService<DetailsExport> baseService, IDetailsExportService service) {
        super(baseService);
        this.service = service;
    }

    @PostMapping("createAll")
    public List<DetailsExport> saveAll(@RequestBody @Valid Iterable<DetailsExport> request) {
        return service.saveAll(request);
    }
}
