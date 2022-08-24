package intern.sapo.be.repository;

import intern.sapo.be.entity.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {
	Optional<Account> findAccountByUsername(String username);
}
