CREATE TABLE
    reading_list_entries (
        user_id INT NOT NULL REFERENCES users (id),
        book_id INT NOT NULL REFERENCES books (id),
        position INT NOT NULL,
        PRIMARY KEY (user_id, book_id)
    );