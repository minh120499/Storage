package intern.sapo.be.base;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@CrossOrigin("*")
public abstract class BaseController<D extends BaseModel> {

    private final IBaseService<D> baseService;
    @GetMapping
    public Page<D> getPagination(@RequestParam(value = "pageNumber",required = true) int pageNumber,
                                          @RequestParam(value = "pageSize",required = true) int pageSize,
                                          @RequestParam(value = "sortBy",required = false) String sortBy,
                                          @RequestParam(value = "sortDir",required = false) String sortDir){
        if (sortDir!= null){
            Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            return baseService.findAll(PageRequest.of(pageNumber-1,pageSize,sort));
        }
        return baseService.findAll(PageRequest.of(pageNumber-1,pageSize));
    }


    @GetMapping("/findAll")
    public List<D> list() {
        return baseService.findAll();
    }

    @PostMapping
    public D create(@RequestBody @Valid D request, BindingResult bindingResult) {
        return baseService.create(request,bindingResult);
    }

    @GetMapping("{id}")
    public D findById(@PathVariable(value = "id") Integer id) {
        return baseService.findById(id);
    }


    @PutMapping
    public D update(@RequestBody @Valid D entity,BindingResult bindingResult) {
        return baseService.update(entity,bindingResult);
    }
     
    @DeleteMapping("{id}")
    public void delete(@PathVariable(value = "id") Integer id) {
        baseService.delete(id);
    }

}
