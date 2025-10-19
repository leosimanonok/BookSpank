CREATE TABLE
    reading_list_entries (
        user_id INT NOT NULL REFERENCES users (id),
        book_id INT NOT NULL REFERENCES books (id),
        want_to_read_next BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY (user_id, book_id)
    );