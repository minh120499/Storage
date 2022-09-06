package intern.sapo.be.security.jwt;

import intern.sapo.be.dto.response.Account.AccountResponse;
import intern.sapo.be.entity.Account;
import intern.sapo.be.entity.Role;
import intern.sapo.be.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	@Autowired
	private JwtTokenUtil jwtUtils;

	@Autowired
	private AccountRepository accountRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request,
	                                HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		if(!hasAuthorizationBearer(request)) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = getAccessToken(request);
		if(!jwtUtils.validateAccessToken(token)) {
			filterChain.doFilter(request, response);
			return;
		}

		setAuthenticationContext(token, request);
		filterChain.doFilter(request, response);
	}

	private boolean hasAuthorizationBearer(HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		return !ObjectUtils.isEmpty(header) && header.startsWith("Bearer");

	}

	private String getAccessToken(HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		return header.split(" ")[1].trim();
	}

	private void setAuthenticationContext(String token, HttpServletRequest request) {
		UserDetails userDetails = getUserDetails(token);
		Set<GrantedAuthority> autorities = new HashSet<>();
		for(String role : jwtUtils.getClaims(token).getAuthorities()) {
			autorities.add(new SimpleGrantedAuthority(role));
		}
		System.out.println(autorities);
		UsernamePasswordAuthenticationToken
				authentication = new UsernamePasswordAuthenticationToken(userDetails, null, autorities);

		authentication.setDetails(
				new WebAuthenticationDetailsSource().buildDetails(request));

		SecurityContextHolder.getContext().setAuthentication(authentication);
	}

	private UserDetails getUserDetails(String token) {
		Account userDetails = new Account();
		String[] jwtSubject = jwtUtils.getSubject(token).split(",");
		userDetails.setId((int) Long.parseLong(jwtSubject[0]));
		userDetails.setUsername(jwtSubject[1]);

		return userDetails;
	}
}
