package intern.sapo.be.base;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;


import java.util.List;
import java.util.Optional;

public interface IBaseService<T> {

    T save(T entity);

    Optional<T> findById(Integer entityId);

    T update(T entity);

    T updateById(T entity, Integer entityId);

    void delete(T entity);

    void deleteById(Integer entityId);

    ResponseListDto<T> getList(Integer page, Integer perPage, String sort, String sortBy);
}
