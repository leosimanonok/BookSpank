package com.bookspank.backend.repository;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import static com.bookspank.jooq.tables.Users.USERS;

import com.bookspank.backend.model.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final DSLContext dsl;

    public User getUser(String email) {
        return this.dsl.select(USERS.ID, USERS.EMAIL, USERS.USERNAME)
                .from(USERS)
                .where(USERS.EMAIL.eq(email)) // use .eq() for comparison
                .fetchOneInto(User.class);
    }

}
