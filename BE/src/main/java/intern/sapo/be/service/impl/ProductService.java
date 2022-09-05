package intern.sapo.be.service.impl;

import intern.sapo.be.dto.request.Product.OptionValuesAdd;
import intern.sapo.be.dto.request.Product.ProductAddDTO;
import intern.sapo.be.dto.request.Product.ProductFilter;
import intern.sapo.be.dto.response.product.ProductFilterResponse;
import intern.sapo.be.dto.response.product.ProductReponse;
import intern.sapo.be.entity.Product;
import intern.sapo.be.entity.ProductVariant;
import intern.sapo.be.repository.*;
import intern.sapo.be.security.jwt.util.Utils;
import intern.sapo.be.service.IProductService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService implements IProductService {
    Utils utils;
    private final ModelMapper mapper;
    private final IProductRepo productRepo;
    private final IProductVariantRepo variantRepo;
    private final IOptionRepo optionRepo;
    private final IOptionValueRepo optionValueRepo;
    private final JdbcTemplate jdbcTemplate;
    private final IProductVariantOptionRepo variantOptionRepo;

    public ProductService(ModelMapper mapper, IProductRepo productRepo, IProductVariantRepo variantRepo, IOptionRepo optionRepo,
                          IOptionValueRepo optionValueRepo, JdbcTemplate jdbcTemplate, IProductVariantOptionRepo variantOptionRepo) {
        this.mapper = mapper;
        this.productRepo = productRepo;
        this.variantRepo = variantRepo;
        this.optionRepo = optionRepo;
        this.optionValueRepo = optionValueRepo;
        this.jdbcTemplate = jdbcTemplate;
        this.variantOptionRepo = variantOptionRepo;
    }

    List<OptionValuesAdd> list = new ArrayList<>();

    @Override
    public List<Product> findAll() {
        return productRepo.findAll();
    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public <S extends Product> S save(S entity, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw utils.invalidInputException(bindingResult);
        entity.setCode(getNewCode());
        entity = productRepo.save(entity);
        return entity;
    }

    @Override
    public ProductReponse findById(Integer id) {

        ProductReponse reponse = new ProductReponse(productRepo.findById(id).get(), variantRepo.findAllByProductId(id));
        return reponse;
    }

    @Override
    @Transactional
    public void deleteById(Integer integer) {

        Product product = productRepo.findById(integer).orElseThrow(() -> new RuntimeException("Id is not exist"));
        product.setIsDelete(true);
        productRepo.save(product);
    }

    @Override
    public Page<Product> findAll(Integer pageNumber, Integer pageSize) {
        return productRepo.findAll(PageRequest.of(pageNumber - 1, pageSize, Sort.Direction.DESC, "name"));

    }



    // Thêm sản phẩm  và biến thể
    @Override
    @Transactional(rollbackOn = SQLException.class)
    public ProductAddDTO save(ProductAddDTO request, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) throw new RuntimeException("Input Invalid");
        Product product = request.getProduct();
        product.setCode(getNewCode());
        request.setProduct(productRepo.save(product));

        for (ProductVariant variant : request.getVariants()) {
            variant.setProductId(request.getProduct().getId());
            variant.setCode(getNewVariantCode());
            variant = variantRepo.save(variant);
        }
        return request;
    }

    @Override
    public List<Product> findAllVariant(Integer pageNumber, Integer pageSize, String name) {
        return null;
    }

    @Override
    public List<ProductFilterResponse> productFilter(ProductFilter filter, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) throw new RuntimeException("Invalid input ");
        String query = "call filter_product(?,?,?,?,?,?)";
        return jdbcTemplate.query(query, new BeanPropertyRowMapper(ProductFilterResponse.class),
                filter.getKey(), filter.getSortBy(), filter.getIsDesc(), filter.getPage(), filter.getSize(), filter.getIsDelete());
    }

    @Override
    public Integer countProductByFilter(ProductFilter filter, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw new RuntimeException("Invalid input ");
//        String query="call filter_product(?,?,?,?,?,?)";
//      Integer total=jdbcTemplate.query(query,new BeanPropertyRowMapper(Integer.class),
//                filter.getKey(),filter.getSortBy(),filter.getIsDesc(),filter.getPage(),filter.getSize(),filter.getIsDelete());
//
        return productRepo.countProductByFilter(filter.getKey(), filter.getSortBy(), filter.getIsDesc(), filter.getPage(), filter.getSize(), filter.getIsDelete());
    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public void deleteVariantById(Integer id) {
        var variant = variantRepo.findById(id).orElseThrow(() -> new RuntimeException("Id is not exist"));
        variant.setIsDelete(true);
        variantRepo.save(variant);
    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public void deleteVariantsById(Integer[] listId) {
        var variants = variantRepo.findAllById(Arrays.asList(listId));
        for (ProductVariant variant : variants) {
            variant.setIsDelete(true);
        }
        variantRepo.saveAll(variants);

    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public void deleteProductsById(Integer[] listId) {
        var products = productRepo.findAllById(Arrays.asList(listId));
        for (Product product : products) {
            product.setIsDelete(true);
        }
        productRepo.saveAll(products);
    }

    public String getNewCode() {
        String newCode = "SP";
        Product product = productRepo.getTop();
        if (product == null) return "SP1";
        newCode = newCode + (product.getId() + 1);
        return newCode;
    }

    public String getNewVariantCode() {
        String newCode = "SPV";
        ProductVariant variant = variantRepo.getTop();

        if (variant == null) return "SPV1";

        newCode = newCode + (variant.getId() + 1);
        return newCode;
    }

//    public void createVariant(List<OptionAdd> options,int n,int length)
//    {
//        if (n<length) {
//            var optionAdd = options.get(n);
//            var values = optionAdd.getValues();
//            var m = values.size();
//            for (int j = 0; j < m; j++) {
//                list.add(values.get(j));
//                if (list.size()==length)
//                {
//                    ProductVariant variant=new ProductVariant();
//                    variant.setCode(getNewVariantCode());
//                    variant.setProductId(optionAdd.getProductId());
//                    variant.setName("1");
//                    variant=variantRepo.save(variant);
//                    addOptionVariant(variant.getId(),list);
//
//                }
//                createVariant(options, n + 1, length);
//                list.remove(values.get(j));
//
//            }
//        }
//
//
//    }
//    public  List<OptionAdd> createOption(List<OptionAdd> options,Integer productId)
//    {
//        for (OptionAdd item : options) {
//
//            //thêm thuộc tính cho sản phẩm
//            item.setProductId(productId);
//            Option option=item.toEntity();
//           item.setId( optionRepo.save(option).getId());
//
//            var optionValues=item.getValues();
//            // thêm giá trị của thuộc tính
//            for (OptionValuesAdd valueItem : optionValues) {
//                valueItem.setOptionId(option.getId());
//                valueItem.setName("tets");
//                var value=valueItem.toEntity();
//                valueItem.setId( optionValueRepo.save(value).getId());
//
//            }
//        }
//
//        return options;
//    }
//
//    public  void addOptionVariant(Integer variantId,List<OptionValuesAdd> optionValuesAdds)
//    {
//        optionValuesAdds.forEach(item->{
//            ProductVariantOption productVariantOption=new ProductVariantOption();
//            productVariantOption.setVariantId(variantId);
//            productVariantOption.setOptionValueId(item.getId());
//            variantOptionRepo.save(productVariantOption);
//
//        });
//    }
}
