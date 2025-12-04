CREATE TABLE
    selection_event_votes (
        id SERIAL PRIMARY KEY,
        event_id INT NOT NULL REFERENCES selection_events (id),
        event_option_id INT NOT NULL REFERENCES selection_event_options (id),
        voter_id INT NOT NULL REFERENCES users (id),
        UNIQUE (voter_id, event_id)
    );