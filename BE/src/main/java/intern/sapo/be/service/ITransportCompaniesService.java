package intern.sapo.be.service;

import intern.sapo.be.dto.request.CategoriesDTO;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface ITransportCompaniesService {
    List<CategoriesDTO> findAll(Integer pageNumber, Integer limit, String sortBy);

    CategoriesDTO findById(Integer id);

    CategoriesDTO create(CategoriesDTO categoriesDTO, BindingResult bindingResult);

    CategoriesDTO update(Integer id, CategoriesDTO categoriesDTO, BindingResult bindingResult);
}

