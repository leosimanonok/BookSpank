package com.bookspank.backend.service.impl;

import org.springframework.stereotype.Service;

import com.bookspank.backend.model.User;
import com.bookspank.backend.repository.UserRepository;
import com.bookspank.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User getUser(String email) {
        return this.userRepository.getUser(email);
    }

}
