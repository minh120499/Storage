package intern.sapo.be.service.impl;

import intern.sapo.be.base.BaseService;
import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.ProductVariant;
import intern.sapo.be.repository.ProductVariantsRepository;
import intern.sapo.be.service.IProductVariantService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductVariantServiceImpl extends BaseService<ProductVariant> implements IProductVariantService {
    public ProductVariantServiceImpl(IBaseRepo<ProductVariant, Integer> baseRepo, ProductVariantsRepository variantsRepository, ProductVariantsRepository repository) {
        super(baseRepo);
        this.repository = repository;
    }

    private final ProductVariantsRepository repository;

    @Override
    public List<ProductVariant> findProductByName(String name) {
        return repository.findProductVariantByName(name);
    }

    @Override
    public Optional<ProductVariant> findProductById(Integer id) {
        return repository.findById(id);
    }
}
