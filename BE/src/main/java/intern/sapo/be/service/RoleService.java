package intern.sapo.be.service;

import intern.sapo.be.dto.payload.RolesRequest;
import intern.sapo.be.dto.request.RolesDTO;
import intern.sapo.be.entity.Account;
import intern.sapo.be.entity.Role;
import intern.sapo.be.repository.AccountRepository;
import intern.sapo.be.repository.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

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

	public Page<Role> getAll(Integer size, Integer page) {
		return roleRepository.findAll(PageRequest.of(page - 1, size, Sort.by("id")));
	}

	public Role save(RolesDTO rolesDTO) {
		Role role = new Role();
		int max = roleRepository.maxId();
//		role.setId(max + 1);
		role.setName(rolesDTO.getName());
		role.setDescription(rolesDTO.getDescription());
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

	public Role update(RolesDTO rolesDTO) {
		try {
			roleRepository.findById(rolesDTO.getId());
			Role role = modelMapper.map(rolesDTO, Role.class);
			return roleRepository.save(role);
		} catch(NoSuchElementException e) {
			throw new NoSuchElementException("Id không tồn tại");
		} catch(Exception ex) {
			throw new RuntimeException(ex);
		}
	}

	public boolean delete(List<Integer> ids) {
		try {
			roleRepository.deleteAllByIdInBatch(ids);
			return true;
		} catch(Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}
}
