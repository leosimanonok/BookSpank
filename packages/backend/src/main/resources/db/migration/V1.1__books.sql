--- Create books table 

CREATE TABLE books (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL, 
    cover_id INTEGER NULL,
    started DATE,
    finished DATE,
    selected_by INT NOT NULL REFERENCES users(id),
    UNIQUE(title, author)
);