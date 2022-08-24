//package intern.sapo.be.security.service;
//
//
//import intern.sapo.be.entity.Account;
//import intern.sapo.be.repository.AccountRepository;
//import lombok.AllArgsConstructor;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@AllArgsConstructor
//@Service
//public class UserDetailServiceImpl implements UserDetailsService {
//
//	private AccountRepository accountRepository;
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		Optional<Account> account = accountRepository.findAccountByUsername(username);
//		return account.map(UserDetailsImpl::new)
//				.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//	}
//}
