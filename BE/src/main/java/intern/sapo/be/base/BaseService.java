package intern.sapo.be.base;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
public abstract class BaseService<T> implements IBaseService<T> {

    private final IBaseRepo<T, Integer> baseRepo;

    @Override
    public T save(T entity) {
        return baseRepo.save(entity);
    }

    @Override
    public Optional<T> findById(Integer entityId) {
        return baseRepo.findById(entityId);
    }

    @Override
    public T update(T entity) {
        return baseRepo.save(entity);
    }

    @Override
    public T updateById(T entity, Integer entityId) {
        Optional<T> optional = baseRepo.findById(entityId);
        if (optional.isPresent()) {
            return baseRepo.save(entity);
        } else {
            return null;
        }
    }

    @Override
    public void delete(T entity) {
        baseRepo.delete(entity);
    }

    @Override
    public void deleteById(Integer entityId) {
        baseRepo.deleteById(entityId);
    }

    @Override
    public List<T> getList(Integer page, Integer perPage, String sort, String sortBy) {

        List<T> data;
        if (sort == null) {
            data = page == null && perPage == null
                    ?
                    baseRepo.findAll()
                    :
                    baseRepo.findAll(PageRequest.of(page - 1, perPage)).getContent();

        } else {
            Sort sortList = sort.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            data = baseRepo.findAll(PageRequest.of(page - 1, perPage, sortList)).getContent();
        }
        return data;
    }
}
