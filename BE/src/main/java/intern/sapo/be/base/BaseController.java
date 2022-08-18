package intern.sapo.be.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import intern.sapo.be.base.*;
import javax.validation.Valid;
import java.io.Serializable;
import java.util.List;

public class BaseController<T,ID extends Serializable> {
    @Autowired
    private IBaseService<T,ID> baseService;
    @PostMapping
    public T save(@RequestBody @Valid T request) {
        return baseService.save(request);
    }


    @PutMapping("/{id}")
    public T update(@RequestBody @Valid T request,@PathVariable ID id) {
        return baseService.updateById(request, id);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable ID id) {
        baseService.deleteById(id);
    }


    @GetMapping
    public List<T> getList(@RequestParam(defaultValue = "1") Integer page,
                                  @RequestParam(defaultValue = "2") Integer perPage,
                                  @RequestParam(required = false) String sort,
                                  @RequestParam(required = false) String sortBy) {
        return baseService.getList(page,perPage,sort,sortBy);
    }
}
