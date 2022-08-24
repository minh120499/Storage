package intern.sapo.be.service.impl;
import intern.sapo.be.dto.request.CategoriesDTO;
import intern.sapo.be.entity.Category;
import intern.sapo.be.repository.ICategoryRepo;
import intern.sapo.be.service.ICategoryService;
import intern.sapo.be.util.Utils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class CategoryService implements ICategoryService {
    private final ICategoryRepo iCategoryRepo;
    private final ModelMapper modelMapper;
    private final Utils utils;


    private CategoriesDTO toDto(Category category){
    CategoriesDTO categoriesDTO  = modelMapper.map(category,CategoriesDTO.class);
    return  categoriesDTO;
    }

    private Category toEntity(CategoriesDTO categoriesDTO){
        Category category = modelMapper.map(categoriesDTO,Category.class);
        return category;
    }

    @Override
    public List<CategoriesDTO> findAll(Integer pageNumber, Integer limit, String sortBy) {
        List<CategoriesDTO> results = new ArrayList<>();

        if(pageNumber != null && limit != null) {
            if (sortBy == null) {
                sortBy = "id";
            }
            Pageable pageable = PageRequest.of(pageNumber - 1, limit, Sort.by(sortBy).descending());
            List<Category> categories = iCategoryRepo.getAll(pageable);
            for (Category item : categories) {
                CategoriesDTO categoriesDTO = toDto(item);
                results.add(categoriesDTO);
            }
            return results;
        }else{
            List<Category> categories = iCategoryRepo.getAll();
            for (Category item : categories) {
                CategoriesDTO categoriesDTO = toDto(item);
                results.add(categoriesDTO);
            }
            return results;
            }
    }

    @Override
    public  CategoriesDTO findById(Integer id) {
        Category category = iCategoryRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found: " + id));
        CategoriesDTO categoriesDTO = toDto(category);
        return categoriesDTO;
    }

    @Override
    public CategoriesDTO create(CategoriesDTO categoriesDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw utils.invalidInputException(bindingResult);
        }
        Category category = toEntity(categoriesDTO);
        iCategoryRepo.save(category);
        categoriesDTO = toDto(category);
        return categoriesDTO;
    }

    @Override
    public CategoriesDTO update(Integer id, CategoriesDTO categoriesDTO, BindingResult bindingResult) {
        Category category = iCategoryRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found:" + id));
        BindingResult result = utils.getListResult(bindingResult, categoriesDTO);
        if (result.hasErrors()) {
            throw utils.invalidInputException(result);
        } else {
                if (category != null)
                {
                    categoriesDTO.setId(id);
                    category = toEntity(categoriesDTO);
                    iCategoryRepo.save(category);
                    categoriesDTO = toDto(category);
                }
                return categoriesDTO;
            }
        }


    @Override
    @Transactional
    public void delete(List<Integer> id) {
        for (Integer item:  id) {
            iCategoryRepo.delete(item.intValue());
        }
    }
}
