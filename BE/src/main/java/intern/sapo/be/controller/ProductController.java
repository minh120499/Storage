package intern.sapo.be.controller;

import intern.sapo.be.entity.Option;
import intern.sapo.be.entity.Product;
import intern.sapo.be.entity.Supplier;
import intern.sapo.be.service.IProductService;
import intern.sapo.be.service.ISupplierService;
import intern.sapo.be.service.impl.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/products")
public class ProductController {

    private ISupplierService supplierService;
    private IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @GetMapping()
    public Page<Product> getPagination(@RequestParam(value = "pageNumber",required = true) int pageNumber,
                                       @RequestParam(value = "pageSize",required = true) int pageSize,
                                       @RequestParam(value = "sortBy",required = false) String sortBy,
                                       @RequestParam(value = "sortDir",required = false) String sortDir){
        return productService.findAll(pageNumber,pageSize,sortBy,sortDir);
    }


    @GetMapping("/findAll")
    public List<Product> list() {
        return productService.findAll();
    }

    @PostMapping
    public Product create(@RequestBody @Valid Product request, @RequestBody @Valid Option option, BindingResult bindingResult) {
        return productService.save(request,bindingResult);
    }

    @GetMapping("{id}")
    public Product findById(@PathVariable(value = "id") Integer id) {
        return productService.findById(id).get();
    }


    @PutMapping
    public Product update(@RequestBody @Valid Product entity,BindingResult bindingResult) {
        return productService.save(entity,bindingResult);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable(value = "id") Integer id) {
        productService.deleteById(id);
    }

}
