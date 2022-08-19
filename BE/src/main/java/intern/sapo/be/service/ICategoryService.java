package intern.sapo.be.service;
import intern.sapo.be.dto.request.CategoriesDTO;
import intern.sapo.be.entity.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    List<CategoriesDTO> getAll(Integer page, Integer limit, String sortBy);
    CategoriesDTO findById(Integer id);
    CategoriesDTO create(CategoriesDTO categoriesDTO, BindingResult bindingResult);
    CategoriesDTO update(Integer id, CategoriesDTO categoriesDTO, BindingResult bindingResult);
    void  delete(int id);
}
