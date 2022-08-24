package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.entity.Export;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exports")
public class ExportController extends BaseController<Export> {
    public ExportController(IBaseService<Export> baseService) {
        super(baseService);
    }
}
