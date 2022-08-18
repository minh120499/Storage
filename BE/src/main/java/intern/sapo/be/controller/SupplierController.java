package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.dto.request.SuppliersDTO;
import intern.sapo.be.entity.Supplier;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@CrossOrigin("*")
@RequestMapping("api/suppliers")
public class SupplierController extends BaseController<Supplier> {


    public SupplierController(IBaseService<Supplier> baseService) {
        super(baseService);
    }
}
