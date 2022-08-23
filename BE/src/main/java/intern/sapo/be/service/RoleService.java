package intern.sapo.be.service;

import intern.sapo.be.dto.request.RolesDTO;
import intern.sapo.be.entity.Role;
import intern.sapo.be.repository.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {
	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	ModelMapper modelMapper;

	public Optional<Role> getOne(Long id) {
		return roleRepository.findById(id);
	}

	public Role save(RolesDTO rolesDTO) {
		Role role = modelMapper.map(rolesDTO, Role.class);
		return roleRepository.save(role);
	}
}
