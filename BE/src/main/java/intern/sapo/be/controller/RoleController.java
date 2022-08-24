package intern.sapo.be.controller;

import intern.sapo.be.dto.payload.RolesRequest;
import intern.sapo.be.dto.request.RolesDTO;
import intern.sapo.be.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin("*")
public class RoleController {
	@Autowired
	RoleService roleService;

	@GetMapping
	public ResponseEntity<?> getRoles() {
		return ResponseEntity.ok(roleService.getAll());
	}

	@GetMapping("emp/{id}")
	public ResponseEntity<?> getRoleByEmp(@PathVariable Integer id) {
		return ResponseEntity.ok(roleService.getRoleByEmp(id));
	}

	@PatchMapping("emp/{id}")
	public ResponseEntity<?> updateRoleByEmp(@PathVariable Integer id, @RequestBody RolesRequest roleIds) {
		return ResponseEntity.ok(roleService.updateRoleByEmp(id, roleIds));
	}

	@GetMapping("{id}")
	public ResponseEntity<?> getRole(@PathVariable Integer id) {
		return ResponseEntity.ok(roleService.getOne(id));
	}

	@PostMapping
	public ResponseEntity<?> addRole(@RequestBody RolesDTO rolesDTO) {
		return ResponseEntity.ok(roleService.save(rolesDTO));
	}
}
