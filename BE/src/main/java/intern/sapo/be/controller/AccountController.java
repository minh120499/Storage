package intern.sapo.be.controller;

import intern.sapo.be.dto.request.AccountDTO;
import intern.sapo.be.entity.Account;
import intern.sapo.be.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/account")
@CrossOrigin
public class AccountController {

	@Autowired
	private AccountService accountService;

	@GetMapping()
	public ResponseEntity<?> getAll(){
		return ResponseEntity.ok(accountService.getAll());
	}

	@PostMapping
	public ResponseEntity<?> createAccount(@Valid @RequestBody AccountDTO accountDTO){
		return ResponseEntity.ok(accountService.save(accountDTO));
	}

	@PatchMapping
	public ResponseEntity<?> editAccount(@Valid @RequestBody AccountDTO accountDTO){
		return ResponseEntity.ok(accountService.edit(accountDTO));
	}

	@DeleteMapping("{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		accountService.delete(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@GetMapping("{id}")
	public Account getAccountDetails(@PathVariable Long id) {
		return accountService.getAllDetails(id);
	}
}
