package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.dto.request.SuppliersDTO;
import intern.sapo.be.entity.Supplier;
import intern.sapo.be.service.ISupplierService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Log4j2
@CrossOrigin("*")
@RequestMapping("api/suppliers")
@AllArgsConstructor
public class SupplierController  {

    private ISupplierService supplierService;


    @GetMapping
    public Page<Supplier> getPagination(@RequestParam(value = "pageNumber",required = true) int pageNumber,
                                 @RequestParam(value = "pageSize",required = true) int pageSize,
                                 @RequestParam(value = "sortBy",required = false) String sortBy,
                                 @RequestParam(value = "sortDir",required = false) String sortDir){
        return supplierService.findAll(pageNumber,pageSize,sortBy,sortDir);
    }


    @GetMapping("/findAll")
    public List<Supplier> list() {
        return supplierService.findAll();
    }

    @PostMapping
    public Supplier create(@RequestBody @Valid Supplier request, BindingResult bindingResult) {
        return supplierService.create(request,bindingResult);
    }

    @GetMapping("{id}")
    public Supplier findById(@PathVariable(value = "id") Integer id) {
        return supplierService.findById(id);
    }


    @PutMapping
    public Supplier update(@RequestBody @Valid Supplier entity,BindingResult bindingResult) {
        return supplierService.update(entity,bindingResult);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable(value = "id") Integer id) {
        supplierService.delete(id);
    }

}
