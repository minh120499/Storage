package intern.sapo.be.repository;

import intern.sapo.be.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>, CrudRepository<Role, Long> {
	Role findRoleByName(String name);
}
