package intern.sapo.be.service.impl;

import intern.sapo.be.config.ModelMapperConfig;
import intern.sapo.be.dto.request.CategoriesDTO;
import intern.sapo.be.entity.Category;
import intern.sapo.be.repository.ICategoryRepo;
import intern.sapo.be.service.ICategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    private final ICategoryRepo iCategoryRepo;
    private final ModelMapperConfig modelMapperConfig;

    public CategoryService(ICategoryRepo iCategoryRepo, ModelMapperConfig modelMapperConfig) {
        this.iCategoryRepo = iCategoryRepo;
        this.modelMapperConfig = modelMapperConfig;
    }

    public CategoriesDTO toDto(Category category)
    cat

    @Override
    public List<CategoriesDTO> getAll() {

        return iCategoryRepo.findAll();
    }
}
