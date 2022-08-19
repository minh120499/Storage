package intern.sapo.be.service.impl;

import intern.sapo.be.dto.request.Product.OptionAdd;
import intern.sapo.be.dto.request.Product.OptionValuesAdd;
import intern.sapo.be.dto.request.Product.ProductAdd;
import intern.sapo.be.entity.Option;
import intern.sapo.be.entity.Product;
import intern.sapo.be.entity.ProductVariant;
import intern.sapo.be.repository.IOptionRepo;
import intern.sapo.be.repository.IOptionValueRepo;
import intern.sapo.be.repository.IProductRepo;
import intern.sapo.be.repository.IProductVariantRepo;
import intern.sapo.be.service.IProductService;
import intern.sapo.be.util.Utils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class ProductService  implements IProductService {
    Utils utils;

    private IProductRepo productRepo;
    private IProductVariantRepo variantRepo;
    private IOptionRepo  optionRepo;
    private IOptionValueRepo optionValueRepo;

    public ProductService(IProductRepo productRepo, IProductVariantRepo variantRepo, IOptionRepo optionRepo, IOptionValueRepo optionValueRepo) {
        this.productRepo = productRepo;
        this.variantRepo = variantRepo;
        this.optionRepo = optionRepo;
        this.optionValueRepo = optionValueRepo;
    }

    @Override
    public List<Product> findAll() {
        return productRepo.findAll();
    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public <S extends Product> S save(S entity, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw utils.invalidInputException(bindingResult);
        entity.setCode(getNewCode());
        entity=productRepo.save(entity);
        return entity;
    }

    @Override
    public Optional<Product> findById(Integer integer) {
        return productRepo.findById(integer);
    }

    @Override
    public boolean existsById(Integer integer) {
        return productRepo.existsById(integer);
    }

    @Override
    public void deleteById(Integer integer) {
        productRepo.deleteById(integer);
    }

    @Override
    public Page<Product> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return productRepo.findAll(PageRequest.of(pageNumber,pageSize-1, Sort.Direction.DESC,sortBy));
    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public Product save(ProductAdd request, BindingResult bindingResult) {
        Product product= request.getProduct();
        product.setCode(getNewCode());
        product=productRepo.save(product);

        var options=request.getOptions();
        List<ProductVariant> variants=new ArrayList<>();
        for (OptionAdd option : options) {
            Option option1=option.toEntity();
            option1.setProductId(product.getId());
            option1=optionRepo.save(option1);

            var optionValue=option.getValues();
            for (OptionValuesAdd optionValuesAdd : optionValue) {
                var value=optionValuesAdd.toEntity();
                value.setOptionId(option1.getId());
                optionValueRepo.save(value);
//                ProductVariant productVariant=new ProductVariant();
//                productVariant.setProductId(product.getId());
//                productVariant.setName(productVariant.getName()+optionValue);
//                productVariant.setImportPrice(new BigDecimal(10));
//                productVariant.setSalePrice(new BigDecimal(10));
//                productVariant.setWholesalePrice(new BigDecimal(10));
//
//                variantRepo.save(productVariant);
            }

        }



        return product;
    }

    public String getNewCode() {
        String newCode = "SP";
        Product product = productRepo.getTop();
        newCode = newCode + String.valueOf(product.getId() + 1);
        return newCode;
    }
    public String getNewVariantCode() {
        String newCode = "SPV";
        Product product = variantRepo.getTop();
        newCode = newCode + String.valueOf(product.getId() + 1);
        return newCode;
    }
}
