package intern.sapo.be.controller;

import intern.sapo.be.dto.payload.LoginRequest;
import intern.sapo.be.dto.request.AccountDTO;
import intern.sapo.be.dto.response.JwtAuthenticationResponse;
import intern.sapo.be.entity.Account;
import intern.sapo.be.exception.AccountException;
import intern.sapo.be.security.jwt.JwtTokenUtil;
import intern.sapo.be.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/account")
@CrossOrigin
@PreAuthorize("hasAnyAuthority('admin')")
public class AccountController {
	@Autowired
	AuthenticationManager authManager;
	@Autowired
	private AccountService accountService;

	@Autowired
	private JwtTokenUtil jwtUtils;

	@GetMapping()
//	@PreAuthorize("hasAuthority('admin')")
	public ResponseEntity<?> getAll() {
		return ResponseEntity.ok(accountService.getAll());
	}

	@GetMapping("{page}")
	public ResponseEntity<?> getPerPage(@PathVariable("page") Integer page, @RequestParam(defaultValue = "10") Integer size) {
		Map<String, Object> result = new HashMap<>();
		Page<Account> accounts = accountService.getPerPage(size, page);
		result.put("data", accounts.getContent());
		result.put("total", accounts.getTotalElements());
		result.put("from", accounts.getSize() * accounts.getNumber() + 1);
		result.put("to", accounts.getSize() * accounts.getNumber() + accounts.getNumberOfElements());
		return ResponseEntity.ok(result);
	}

	@PostMapping
	public ResponseEntity<?> createAccount(@Valid @RequestBody AccountDTO accountDTO) {
		return ResponseEntity.ok(accountService.save(accountDTO));
	}

	@PatchMapping
	public ResponseEntity<?> editAccount(@Valid @RequestBody AccountDTO accountDTO) {
		return ResponseEntity.ok(accountService.edit(accountDTO));
	}

	@DeleteMapping("{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		accountService.delete(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

//	@GetMapping("{id}")
//	public ResponseEntity<?> getAccountDetails(@PathVariable Integer id) {
//		return ResponseEntity.ok(accountService.getAllDetails(id));
//	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		try {
			Authentication authentication = authManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							loginRequest.getUsername(), loginRequest.getPassword())
			);

			Account account = (Account) authentication.getPrincipal();
			String accessToken = jwtUtils.generateAccessToken(account);
			JwtAuthenticationResponse response = new JwtAuthenticationResponse(accessToken);
			return ResponseEntity.ok(response);

		} catch(BadCredentialsException ex) {
			throw new AccountException("Invalid Username or Password");
		}
	}
}
