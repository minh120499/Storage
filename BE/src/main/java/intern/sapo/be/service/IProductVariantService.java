package intern.sapo.be.service;

import intern.sapo.be.base.IBaseService;
import intern.sapo.be.entity.ProductVariant;

import java.util.List;

public interface IProductVariantService extends IBaseService<ProductVariant> {
    public List<ProductVariant> findProductByName(String name);
}
