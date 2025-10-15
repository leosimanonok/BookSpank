CREATE TABLE
    club_history (
        id SERIAL PRIMARY KEY,
        selected_by INT NOT NULL REFERENCES users (id),
        book_id INT NOT NULL UNIQUE REFERENCES books (id),
        started DATE,
        finished DATE
    );

CREATE UNIQUE INDEX enforce_single_null_in_finished ON club_history ((finished IS NULL))
WHERE
    finished IS NULL;