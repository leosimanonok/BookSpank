CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    mock VARCHAR(25) NOT NULL,
    user_id INT NOT NULL REFERENCES users(id)
);