package intern.sapo.be.service.impl;

import intern.sapo.be.entity.Product;
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
    public <S extends Product> S save(S entity, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw utils.invalidInputException(bindingResult);
        entity.setCode(getNewCode());
        return productRepo.save(entity);
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
    public String getNewCode() {
        String newCode = "SP";
        Product product = productRepo.getTop();
        newCode = newCode + String.valueOf(product.getId() + 1);
        return newCode;
    }
}
