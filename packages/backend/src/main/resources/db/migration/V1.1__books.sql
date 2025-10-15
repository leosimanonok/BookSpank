CREATE TABLE
    books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        cover_id INTEGER NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
        UNIQUE (title, author)
    );