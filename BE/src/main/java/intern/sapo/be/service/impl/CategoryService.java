package intern.sapo.be.service.impl;

import intern.sapo.be.entity.Category;
import intern.sapo.be.repository.ICategoryRepo;
import intern.sapo.be.security.jwt.util.Utils;
import intern.sapo.be.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.List;


@RequiredArgsConstructor
@Service
public class CategoryService implements ICategoryService {
    private final ICategoryRepo iCategoryRepo;
    private final Utils utils;


    @Override
    public Page<Category> findAll(Integer pageNumber, Integer limit, String sortBy, String sortDir) {
        if (sortDir != null) {
            Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            return iCategoryRepo.findAll(PageRequest.of(pageNumber - 1, limit, sort));
        } else
            return iCategoryRepo.findAll(PageRequest.of(pageNumber - 1, limit));
    }

    @Override
    public Category findById(Integer id) {
        Category category = iCategoryRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found: " + id));
        return category;
    }

    @Override
    public List<Category> getAll() {
        return iCategoryRepo.findAll();
    }

    @Override
    public Category create(Category category, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw utils.invalidInputException(bindingResult);
        } else {
            return iCategoryRepo.save(category);
        }
    }

    @Override
    public Category update(Integer id, Category category, BindingResult bindingResult) {
        iCategoryRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found:" + id));
        if (bindingResult.hasErrors()) {
            throw utils.invalidInputException(bindingResult);
        } else {
            category.setId(id);
            return iCategoryRepo.save(category);
        }
    }


    @Override
    @Transactional
    public void deleteLíst(List<Integer> id) {
        for (Integer item : id) {
            iCategoryRepo.delete(item.intValue());
        }
    }

    @Override
    public void delete(Integer id) {
        iCategoryRepo.delete(id);
    }
}