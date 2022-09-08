package intern.sapo.be.controller;

import intern.sapo.be.dto.payload.LoginRequest;
import intern.sapo.be.dto.response.JwtAuthenticationResponse;
import intern.sapo.be.entity.Account;
import intern.sapo.be.exception.AccountException;
import intern.sapo.be.security.jwt.JwtTokenUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/")
@RestController
@CrossOrigin
@AllArgsConstructor
public class LoginController {
	private final AuthenticationManager authManager;
	private final JwtTokenUtil jwtUtils;

	@PostMapping("/login")
	public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
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
