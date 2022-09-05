package intern.sapo.be.repository;

import intern.sapo.be.entity.Role;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.validation.BindingResult;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>, CrudRepository<Role, Integer> {
	Role findRoleByName(String name);

	@Query(value = "SELECT max(id) FROM roles", nativeQuery = true)
	Integer maxId();
}
