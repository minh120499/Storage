package intern.sapo.be.service;
import intern.sapo.be.dto.request.CategoriesDTO;

import java.util.List;

public interface ICategoryService {
    List<CategoriesDTO> getAll();
}
