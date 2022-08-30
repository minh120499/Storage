package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.dto.request.Product.ProductVariantDTO;
import intern.sapo.be.entity.ProductVariant;
import intern.sapo.be.service.IProductVariantService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product-variants")
public class ProductVariantController extends BaseController<ProductVariant> {
    private final IProductVariantService productVariantService;



    public ProductVariantController(IBaseService<ProductVariant> baseService, IProductVariantService productVariantService, JdbcTemplate jdbcTemplate) {
        super(baseService);
        this.productVariantService = productVariantService;

    }

    @GetMapping("search")
    public List<ProductVariant> findProductByName(@RequestParam(defaultValue = "") String name) {
        return productVariantService.findProductByName(name);
    }

    @GetMapping("/findProductVariant")
    public List<ProductVariantDTO> findProductVariant(@RequestParam Integer pageNumber, @RequestParam Integer pageSize) {
        return productVariantService.findAllProductVariantDTO(pageNumber, pageSize);
    }

    @GetMapping("/findAllProductVariant")
    public List<ProductVariantDTO> findAllProductVariant() {
        return productVariantService.findAllProductVariantDTO();
    }

    @GetMapping("/count-total")
    public Integer count() {
        return productVariantService.countTotalPage();
    }
//    @GetMapping("{id}")
//    public Optional<ProductVariant> findProductById(@PathVariable Integer id) {
//        return productVariantService.findProductById(id);
//    }
}
