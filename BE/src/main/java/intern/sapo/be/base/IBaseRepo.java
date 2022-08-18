package intern.sapo.be.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

@NoRepositoryBean
public interface IBaseRepo<E,Id extends Serializable> extends JpaRepository<E,Id> {

//    T findByCode(String code);

}
