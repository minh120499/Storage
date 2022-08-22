package intern.sapo.be.service.impl;

import intern.sapo.be.dto.request.CategoriesDTO;
import intern.sapo.be.service.ITransportCompaniesService;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;

@Service
public class TransportCompaniesService implements ITransportCompaniesService {
    @Override
    public List<CategoriesDTO> findAll(Integer pageNumber, Integer limit, String sortBy) {
        return null;
    }

    @Override
    public CategoriesDTO findById(Integer id) {
        return null;
    }

    @Override
    public CategoriesDTO create(CategoriesDTO categoriesDTO, BindingResult bindingResult) {
        return null;
    }

    @Override
    public CategoriesDTO update(Integer id, CategoriesDTO categoriesDTO, BindingResult bindingResult) {
        return null;
    }
}
