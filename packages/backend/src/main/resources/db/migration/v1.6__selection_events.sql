CREATE TABLE
    selection_events (
        id SERIAL PRIMARY KEY,
        selector_id INT NOT NULL REFERENCES users (id), --- User ID of next user 
        status selection_event_status DEFAULT 'created',
    );