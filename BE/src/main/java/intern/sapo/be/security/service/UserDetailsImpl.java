//package intern.sapo.be.security.service;
//
//import intern.sapo.be.entity.Account;
//import intern.sapo.be.entity.Role;
//import intern.sapo.be.repository.RoleRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.util.Objects;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import static org.aspectj.weaver.tools.cache.SimpleCacheFactory.enabled;
//
//public class UserDetailsImpl extends Account implements UserDetails {
//
//	private Account account;
//
//	public UserDetailsImpl(final Account account) {
//		this.account = account;
//	}
//
//	@Autowired
//	private RoleRepository roleRepository;
//
//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//		Set<String> permissions;
//		permissions = getRoles().stream().map(Role::getName).collect(Collectors.toSet());
//		getRoles().forEach(role -> {
//			Set<String> permissionsOfRoles = roleRepository.findAll().stream().map(Role::getName).collect(Collectors.toSet());
//			permissions.addAll(permissionsOfRoles);
//		});
//		return permissions.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
//	}
//
//	@Override
//	public String getPassword() {
//		return super.getPassword();
//	}
//
//	@Override
//	public String getUsername() {
//		return super.getUsername();
//	}
//
//	@Override
//	public boolean isAccountNonExpired() {
//		return true;
//	}
//
//	@Override
//	public boolean isAccountNonLocked() {
//		return !super.getIsDelete().equals(true);
//	}
//
//	@Override
//	public boolean isCredentialsNonExpired() {
//		return true;
//	}
//
//	@Override
//	public boolean isEnabled() {
//		return enabled;
//	}
//
//	@Override
//	public int hashCode() {
//		return Objects.hash(getId());
//	}
//
//	@Override
//	public boolean equals(Object o) {
//		if(this == o) return true;
//		if(!(o instanceof UserDetailsImpl)) return false;
//		UserDetailsImpl that = (UserDetailsImpl) o;
//		return Objects.equals(getId(), that.getId());
//	}
//}
