package intern.sapo.be.service;

import com.sun.tools.javac.util.ListBuffer;
import intern.sapo.be.dto.request.Product.ProductAdd;
import intern.sapo.be.dto.response.ProductReponse;
import intern.sapo.be.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

public interface IProductService {
    List<Product> findAll();

    <S extends Product> S save(S entity, BindingResult bindingResult);

    ProductReponse findById(Integer integer);


    void deleteById(Integer integer);

    Page<Product> findAll(Integer pageNumber, Integer pageSize);

    Product save(ProductAdd request, BindingResult bindingResult);

    List<Product> findAllVariant(Integer pageNumber, Integer pageSize, String name);
}
