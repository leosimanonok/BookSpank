CREATE TABLE
    selection_event_options (
        id SERIAL PRIMARY KEY,
        event_id INT NOT NULL REFERENCES selection_events (id),
        book_id INT NOT NULL REFERENCES books (id),
        UNIQUE (event_id, book_id)
    );