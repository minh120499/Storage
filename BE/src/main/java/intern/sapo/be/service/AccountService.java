package intern.sapo.be.service;

import intern.sapo.be.dto.request.AccountDTO;
import intern.sapo.be.dto.response.Account.AccountResponse;
import intern.sapo.be.entity.Account;
import intern.sapo.be.entity.Employee;
import intern.sapo.be.entity.Role;
import intern.sapo.be.repository.AccountRepository;
import intern.sapo.be.repository.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private RoleRepository roleRepository;

	private PasswordEncoder passwordEncoder;

	@Autowired
	ModelMapper modelMapper;

	public Iterable<Account> getAll() {
//		List<Account> a = accountRepository.findAllByIsDelete();

		return accountRepository.findAll();
	}

	public Account save(AccountDTO accountDTO) {
		Account account = modelMapper.map(accountDTO, Account.class);
		account.setCreateAt(new Timestamp(new Date().getTime()));
		account.setUpdateAt(new Timestamp(new Date().getTime()));
		if(!accountDTO.getPassword().isEmpty()) {
			account.setPassword(passwordEncoder.encode(accountDTO.getPassword()));
		}
		account.setIsDelete(false);

		Employee employee = new Employee();
		employee.setAddress(accountDTO.getAddress());
		employee.setEmail(accountDTO.getEmail());
		employee.setPhone(accountDTO.getPhone());
		employee.setImage(accountDTO.getImage());
		employee.setFullName(accountDTO.getFullName());

		Set<Role> roles = new HashSet<>();
		for(String role : accountDTO.getRoleIds()) {
			Role roleId = roleRepository.findRoleByName(role);
			roles.add(roleId);
		}

		employee.setAccount(account);

		account.setEmployee(List.of(employee));
		account.setRoles(roles);
		return accountRepository.save(account);

	}

	public Account edit(AccountDTO accountDTO) {
		Account account = modelMapper.map(accountDTO, Account.class);

		Set<Role> roles = new HashSet<>();
		for(String role : accountDTO.getRoleIds()) {
			Role roleId = roleRepository.findRoleByName(role);
			roles.add(roleId);
		}

		account.setRoles(roles);
		return accountRepository.save(account);
	}

	public void delete(Integer id) {
		Account account = accountRepository.findById(id).get();
		account.setIsDelete(true);
		accountRepository.save(account);
	}

	public AccountResponse getAllDetails(Integer id) {
		try {
			Account account = accountRepository.findById(id).get();
			AccountResponse accountResponse = modelMapper.map(account, AccountResponse.class);
			if(!account.getEmployee().isEmpty()) {
				accountResponse.setFullName(account.getEmployee().get(0).getFullName());
				accountResponse.setImage(account.getEmployee().get(0).getImage());
				accountResponse.setEmail(account.getEmployee().get(0).getEmail());
				accountResponse.setPhone(account.getEmployee().get(0).getPhone());
				accountResponse.setAddress(account.getEmployee().get(0).getAddress());
			}
			if(!account.getRoles().isEmpty()) {
				accountResponse.setRoleIds(account.getRoles().stream().map(r -> r.getId()).collect(Collectors.toList()));
				accountResponse.setAuthorities(account.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
			}

			return accountResponse;
		} catch(Exception e) {
			e.printStackTrace();
			throw new NoSuchElementException("Account don't exist");
		}
	}
}
