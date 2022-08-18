package intern.sapo.be.service;

import intern.sapo.be.base.IBaseService;
import intern.sapo.be.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface ISupplierService  {

    Page<Supplier> findAll(Integer pageNumber,Integer pageSize, String sortBy,String sortDir);

    List<Supplier> findAll();

    Supplier create(Supplier t, BindingResult bindingResult);

    Supplier findById(int id);

    Supplier update(Supplier t,BindingResult bindingResult);

    void delete(int id);
}
