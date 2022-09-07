package intern.sapo.be.controller;

import intern.sapo.be.entity.Category;
import intern.sapo.be.service.ICategoryService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Log4j2
@CrossOrigin("*")
@RequestMapping("/api/categories")
@AllArgsConstructor
public class CategoryController {
    public final ICategoryService iCategoryService;

    @GetMapping("")
    public Page<Category> getAllByPage(@RequestParam(value = "page", required = true, defaultValue = "1") Integer pageNumber,
                                 @RequestParam(value = "limit", required = true, defaultValue = "10") Integer limit,
                                 @RequestParam(value = "sortby", required = false) String sortBy,
                                 @RequestParam(value = "sortdir", required = false) String sortDir){
        return iCategoryService.findAll(pageNumber,limit,sortBy,sortDir);
    }

    @GetMapping("/findall")
    public List<Category> getdAll(@RequestParam(value = "valueInput", required = false) String valueInput){
        return iCategoryService.getAll(valueInput);
    }

    @GetMapping("/category/{id}")
    public Category getById(@PathVariable(value = "id") Integer id)
    {
        return iCategoryService.findById(id);
    }

    @PostMapping("/category")
    public Category create(@RequestBody @Valid Category category, BindingResult bindingResult) {
        return iCategoryService.create(category,bindingResult);
    }


    @PutMapping("/category/{id}")
    public Category update (@RequestBody @Valid Category category,BindingResult bindingResult,
                                 @PathVariable(value = "id") Integer id){
        return iCategoryService.update(id,category,bindingResult);
    }

    @PostMapping("/delete")
    public void deleteList (@RequestBody List<Integer> id){
        iCategoryService.deleteLíst(id);
    }


}
