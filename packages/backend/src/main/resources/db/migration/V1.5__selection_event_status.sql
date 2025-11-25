CREATE TYPE selection_event_status AS ENUM (
    'created', --- pre confirmation of want-to-reads
    'confirmed', --- voting in progress
    'complete' --- all votes are in
);