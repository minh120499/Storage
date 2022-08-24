package intern.sapo.be.service.impl;

import intern.sapo.be.dto.request.Product.OptionAdd;
import intern.sapo.be.dto.request.Product.OptionValuesAdd;
import intern.sapo.be.dto.request.Product.ProductAdd;
import intern.sapo.be.dto.response.ProductReponse;
import intern.sapo.be.entity.Option;
import intern.sapo.be.entity.Product;
import intern.sapo.be.entity.ProductVariant;
import intern.sapo.be.entity.ProductVariantOption;
import intern.sapo.be.repository.*;
import intern.sapo.be.service.IProductService;
import intern.sapo.be.security.jwt.util.Utils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService implements IProductService {
    private final IProductRepo productRepo;
    private final IProductVariantRepo variantRepo;
    private final IOptionRepo  optionRepo;
    private final IOptionValueRepo optionValueRepo;
    private final Utils utils;


    private  final IProductVariantOptionRepo variantOptionRepo;
    public ProductService(IProductRepo productRepo, IProductVariantRepo variantRepo, IOptionRepo optionRepo, IOptionValueRepo optionValueRepo, IProductVariantOptionRepo variantOptionRepo, Utils utils) {
        this.productRepo = productRepo;
        this.variantRepo = variantRepo;
        this.optionRepo = optionRepo;
        this.optionValueRepo = optionValueRepo;
        this.variantOptionRepo = variantOptionRepo;
        this.utils = utils;
    }
    List<OptionValuesAdd> list=new ArrayList<>();

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
    public ProductReponse findById(Integer id) {
        ProductReponse reponse=new ProductReponse(productRepo.findById(id).get(),variantRepo.findAllByProductId(id));
        return reponse;
    }

    @Override
    public void deleteById(Integer integer) {
        productRepo.deleteById(integer);
    }

    @Override
    public Page<Product> findAll(Integer pageNumber, Integer pageSize) {
        return productRepo.findAll(PageRequest.of(pageNumber-1,pageSize, Sort.Direction.DESC,"name"));
    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public Product save(ProductAdd request, BindingResult bindingResult) {
        Product product= request.getProduct();
        var options=request.getOptions();
//        option.setProductId(product.getId());

        product.setCode(getNewCode());
        product=productRepo.save(product);

        options=createOption(options, product.getId());
        createVariant(options,0, options.size());


        return product;
    }

    @Override
    public List<Product> findAllVariant(Integer pageNumber, Integer pageSize, String name) {
        return null;
    }

    public String getNewCode() {
        String newCode = "SP";
        Product product = productRepo.getTop();
        newCode = newCode + (product.getId() + 1);
        return newCode;
    }
    public String getNewVariantCode() {
        String newCode = "SPV";
        ProductVariant variant = variantRepo.getTop();

        if (variant== null) return "SPV1";

            newCode = newCode + (variant.getId() + 1);
        return newCode;
    }

    public void createVariant(List<OptionAdd> options,int n,int length)
    {
        if (n<length) {
            var optionAdd = options.get(n);
            var values = optionAdd.getValues();
            var m = values.size();
            for (int j = 0; j < m; j++) {
                list.add(values.get(j));
                if (list.size()==length)
                {
                    ProductVariant variant=new ProductVariant();
                    variant.setCode(getNewVariantCode());
                    variant.setProductId(optionAdd.getProductId());
                    variant.setName("1");
                    variant=variantRepo.save(variant);
                    addOptionVariant(variant.getId(),list);

                }
                createVariant(options, n + 1, length);
                list.remove(values.get(j));

            }
        }


    }
    public  List<OptionAdd> createOption(List<OptionAdd> options,Integer productId)
    {
        for (OptionAdd item : options) {

            //thêm thuộc tính cho sản phẩm
            item.setProductId(productId);
            Option option=item.toEntity();
           item.setId( optionRepo.save(option).getId());

            var optionValues=item.getValues();
            // thêm giá trị của thuộc tính
            for (OptionValuesAdd valueItem : optionValues) {
                valueItem.setOptionId(option.getId());
                valueItem.setName("tets");
                var value=valueItem.toEntity();
                valueItem.setId( optionValueRepo.save(value).getId());

            }
        }

        return options;
    }

    public  void addOptionVariant(Integer variantId,List<OptionValuesAdd> optionValuesAdds)
    {
        optionValuesAdds.forEach(item->{
            ProductVariantOption productVariantOption=new ProductVariantOption();
            productVariantOption.setVariantId(variantId);
            productVariantOption.setOptionValueId(item.getId());
            variantOptionRepo.save(productVariantOption);

        });
    }
}
