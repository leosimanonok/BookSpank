package com.bookspank.backend.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bookspank.backend.dto.UpdateUserForm;
import com.bookspank.backend.model.User;
import com.bookspank.backend.repository.UserRepository;
import com.bookspank.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public Optional<User> getUser(String email) {
        return this.userRepository.getUser(email);
    }

    @Override
    public Optional<User> updateUsername(UpdateUserForm form) {
        return this.userRepository.updateUser(form);
    }

}
