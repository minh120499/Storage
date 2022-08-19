package intern.sapo.be.service;

import intern.sapo.be.dto.request.Product.ProductAdd;
import intern.sapo.be.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    List<Product> findAll();

    <S extends Product> S save(S entity, BindingResult bindingResult);

    Optional<Product> findById(Integer integer);

    boolean existsById(Integer integer);

    void deleteById(Integer integer);

    Page<Product> findAll(int pageNumber, int pageSize, String sortBy, String sortDir);

    Product save(ProductAdd request, BindingResult bindingResult);
}
