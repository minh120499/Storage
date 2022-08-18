package com.vnpt.meeting.booking.security.service;

import com.vnpt.meeting.booking.entity.UserEntity;
import com.vnpt.meeting.booking.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> userEntity = userRepository.findByUsername(username);
        return userEntity.map(UserDetailsImpl::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}
