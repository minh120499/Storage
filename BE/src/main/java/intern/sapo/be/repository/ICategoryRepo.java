package intern.sapo.be.repository;

import intern.sapo.be.entity.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICategoryRepo extends JpaRepository<Category,Integer>{
    @Query("select c from Category c")
    List<Category> getAll(Pageable pageable);
    @Query(value = "call delete_category(?1)", nativeQuery = true)
    void delete(Integer id);

}
