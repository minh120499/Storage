package intern.sapo.be.service;

import intern.sapo.be.dto.payload.RolesRequest;
import intern.sapo.be.dto.request.RolesDTO;
import intern.sapo.be.entity.Account;
import intern.sapo.be.entity.Role;
import intern.sapo.be.repository.AccountRepository;
import intern.sapo.be.repository.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoleService {
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	ModelMapper modelMapper;

	public Optional<Role> getOne(Integer id) {
		return roleRepository.findById(id);
	}

	public List<Role> getAll() {
		return roleRepository.findAll();
	}

	public Role save(RolesDTO rolesDTO) {
		Role role = modelMapper.map(rolesDTO, Role.class);
		return roleRepository.save(role);
	}

	public Account getRoleByEmp(Integer id) {
		return accountRepository.findById(id).get();
	}

	public Account updateRoleByEmp(Integer id, RolesRequest rolesId) {
		Account account = accountRepository.findById(id).get();
		Account old = modelMapper.map(account, Account.class);

		List<Role> roles = new ArrayList<>();
		for(String role : rolesId.getRolesString()) {
			Role roleId = roleRepository.findRoleByName(role);
			roles.add(roleId);
		}

		old.setRoles(new HashSet<>(roles));
		accountRepository.save(old);
		return old;
	}
}
