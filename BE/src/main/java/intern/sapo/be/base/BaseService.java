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
public abstract class BaseService<D extends BaseModel,E extends BaseModel> implements IBaseService<D> {

    private final IBaseRepo<E, Integer> baseRepo;

//    private final Utils utils;

    private final ModelMapper modelMapper;

    @Override
    public Page<D> findAll(Pageable pageable) {
        Type listType = new TypeToken<Class<D>>() {}.getType();
        Page<D> d = baseRepo.findAll(pageable).map(entity -> modelMapper.map(entity,listType));
        return d;
    }

    @Override
    public List<D> findAll() {
        Type listType = new TypeToken<Class<D>>() {}.getType();
        List<D> dList = new ArrayList<>();
        List<E> eList = baseRepo.findAll();
        for (E e: eList){
            dList.add(modelMapper.map(e,listType));
        }
        return dList;
    }

    @Override
    public D create(D request, BindingResult bindingResult) {
//        return baseRepo.save(request);
        return null;
    }

    @Override
    public D findById(int id) {
//        return baseRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found: " + id));
        return null;

    }

    @Override
    public D update(D request, BindingResult bindingResult) {
//        var t = baseRepo.findById(request.getId()).orElseThrow(() -> new IllegalArgumentException(("id not found: " + request.getId())));
//        return baseRepo.save(t);
        return null;
    }

    @Override
    public void delete(int id) {
        baseRepo.findById(id).orElseThrow(() -> new IllegalArgumentException(("id not found: " + id)));
        baseRepo.deleteById(id);
    }
}
