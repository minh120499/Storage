package intern.sapo.be.service;

import intern.sapo.be.dto.request.Product.ProductAdd;
import intern.sapo.be.dto.request.Product.ProductAddDTO;
import intern.sapo.be.dto.response.ProductReponse;
import intern.sapo.be.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface IProductService {
    List<Product> findAll();

    <S extends Product> S save(S entity, BindingResult bindingResult);

    ProductReponse findById(Integer integer);


    void deleteById(Integer integer);

    Page<Product> findAll(Integer pageNumber, Integer pageSize);

    Product save(ProductAdd request, BindingResult bindingResult);
    ProductAddDTO save(ProductAddDTO request, BindingResult bindingResult);


    List<Product> findAllVariant(Integer pageNumber, Integer pageSize, String name);
}
