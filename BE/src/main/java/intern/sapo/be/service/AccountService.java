package intern.sapo.be.service;

import intern.sapo.be.dto.request.AccountDTO;
import intern.sapo.be.entity.Account;
import intern.sapo.be.entity.Employee;
import intern.sapo.be.entity.Role;
import intern.sapo.be.repository.AccountRepository;
import intern.sapo.be.repository.EmployeeRepository;
import intern.sapo.be.repository.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	ModelMapper modelMapper;

	public Iterable<Account> getAll() {
		return accountRepository.findAll();
	}

	public Account save(AccountDTO accountDTO) {
		Account account = modelMapper.map(accountDTO, Account.class);
		account.setCreateAt(new Timestamp(new Date().getTime()));
		account.setUpdateAt(new Timestamp(new Date().getTime()));
//		account.setPassword();
		account.setIsDelete(false);

		Employee employee = new Employee();
		employee.setAddress(accountDTO.getAddress());
		employee.setEmail(accountDTO.getEmail());
		employee.setPhone(accountDTO.getPhone());
		employee.setImage(accountDTO.getImage());
		employee.setFullName(accountDTO.getFullName());

		Set<Role> roles = new HashSet<>();
		for(String role: accountDTO.getRoleIds()) {
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
		for(String role: accountDTO.getRoleIds()) {
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

	public Account getAllDetails(Integer id) {
		Account account = accountRepository.findById(id).get();

		return account;

	}
}
