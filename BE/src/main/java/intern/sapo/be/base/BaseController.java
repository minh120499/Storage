package intern.sapo.be.base;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import intern.sapo.be.base.*;
import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@CrossOrigin("*")
public abstract class BaseController<T> {

    private final IBaseService<T> baseService;

    @PostMapping
    public T save(@RequestBody @Valid T request) {
        return baseService.save(request);
    }


    @PutMapping("/{id}")
    public T update(@RequestBody @Valid T request, @PathVariable Integer id) {
        return baseService.updateById(request, id);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        baseService.deleteById(id);
    }


    @GetMapping
    public List<T> listAll(@RequestParam(required = false) Integer page,
                           @RequestParam(required = false) Integer perPage,
                           @RequestParam(required = false) String sort,
                           @RequestParam(required = false) String sortBy) {
        return baseService.getList(page, perPage, sort, sortBy);
    }
}
