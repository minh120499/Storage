package intern.sapo.be.base;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;


import java.util.List;

public interface IBaseService<D> {
    //D for DTO & E for Entity
    Page<D> findAll(Pageable pageable);

    List<D> findAll();

    D create(D d, BindingResult bindingResult);

    D findById(int id);

    D update(D t,BindingResult bindingResult);

    void delete(int id);
}
