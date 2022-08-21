package intern.sapo.be.service.impl;

import intern.sapo.be.base.BaseService;
import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.ProductVariant;
import intern.sapo.be.repository.ProductVariantsRepository;
import intern.sapo.be.service.IProductVariantService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductVariantServiceImpl extends BaseService<ProductVariant> implements IProductVariantService {
    public ProductVariantServiceImpl(IBaseRepo<ProductVariant, Integer> baseRepo, ProductVariantsRepository variantsRepository) {
        super(baseRepo);
        this.variantsRepository = variantsRepository;
    }

    private final ProductVariantsRepository variantsRepository;

    @Override
    public List<ProductVariant> findProductByName(String name) {
        return variantsRepository.findProductVariantByName(name);
    }
}
