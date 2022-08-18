package intern.sapo.be.base;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public interface IBaseService<T ,ID extends Serializable> {
    T save(T entity);

    Optional<T> findById(ID entityId);

    T update(T entity);

    T updateById(T entity, ID entityId);

    void delete(T entity);

    void deleteById(ID entityId);

    List<T> getList(Integer page, Integer perPage, String sort, String sortBy);
}
