package com.bookspank.backend.repository;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import static com.bookspank.jooq.tables.Users.USERS;

import java.util.Optional;

import com.bookspank.backend.dto.UpdateUserForm;
import com.bookspank.backend.model.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final DSLContext dsl;

    public Optional<User> getUser(String email) {
        return this.dsl.select(USERS.ID, USERS.USERNAME)
                .from(USERS)
                .where(USERS.EMAIL.eq(email)) // use .eq() for comparison
                .limit(1)
                .fetchOptionalInto(User.class);
    }

    public Optional<User> updateUser(UpdateUserForm form) {
        return this.dsl.update(USERS)
                .set(USERS.USERNAME, form.getUsername())
                .where(USERS.ID.eq(form.getId()))
                .returning(USERS.ID, USERS.USERNAME) // columns to fetch
                .fetchOptionalInto(User.class);
    }

}
