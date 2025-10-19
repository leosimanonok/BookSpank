CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    book_id INT NOT NULL REFERENCES books(id),
    written_by INT NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    written_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(book_id, written_by)
);
