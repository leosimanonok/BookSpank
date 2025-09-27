CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    book_id INT NOT NULL REFERENCES books(id),
    user_id VARCHAR(255) NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    written_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(book_id, user_id)
);
