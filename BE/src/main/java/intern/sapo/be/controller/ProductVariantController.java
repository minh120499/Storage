package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.entity.ProductVariant;
import intern.sapo.be.service.IProductVariantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/products-variant")
public class ProductVariantController extends BaseController<ProductVariant> {
    private final IProductVariantService productVariantService;

    public ProductVariantController(IBaseService<ProductVariant> baseService,
                                    IProductVariantService productVariantService) {
        super(baseService);
        this.productVariantService = productVariantService;
    }

    @GetMapping("search")
    public List<ProductVariant> findProductByName(@RequestParam(defaultValue = "") String name) {
        return productVariantService.findProductByName(name);
    }
    // @GetMapping("{id}")
    // public Optional<ProductVariant> findProductById(@PathVariable Integer id) {
    // return productVariantService.findProductById(id);
    // }
}
