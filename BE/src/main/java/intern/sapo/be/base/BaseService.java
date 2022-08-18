package intern.sapo.be.base;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@RequiredArgsConstructor
public abstract class BaseService<T extends BaseModel> implements IBaseService<T> {

    private final IBaseRepo<T, Integer> baseRepo;

//    private final Utils utils;

    private final ModelMapper modelMapper;

    @Override
    public Page<T> findAll(Pageable pageable) {
        return baseRepo.findAll(pageable);

    }

    @Override
    public List<T> findAll() {
       return baseRepo.findAll();
    }

    @Override
    public T create(T request, BindingResult bindingResult) {
        return baseRepo.save(request);

    }

    @Override
    public T findById(int id) {
        return baseRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found: " + id));

    }

    @Override
    public T update(T request, BindingResult bindingResult) {
        var t = baseRepo.findById(request.getId()).orElseThrow(() -> new IllegalArgumentException(("id not found: " + request.getId())));
        return baseRepo.save(t);
    }

    @Override
    public void delete(int id) {
        baseRepo.findById(id).orElseThrow(() -> new IllegalArgumentException(("id not found: " + id)));
        baseRepo.deleteById(id);
    }
}
