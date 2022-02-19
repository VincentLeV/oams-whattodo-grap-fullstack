CREATE TABLE todo (
    id SERIAL PRIMARY KEY, 
    description text NOT NULL, 
    deadline date, 
    priority integer, 
    is_completed boolean
);

INSERT INTO todo (description, deadline, priority, is_completed, created_at, updated_at)
VALUES 
    ('Todo 1', '2022-02-18T08:40:33.268Z', 0, false, '2022-02-19T08:40:33.268Z', '2022-02-19T08:40:33.268Z'),
    ('Todo 2', '2022-02-18T08:40:33.268Z', 1, false, '2022-02-19T08:40:33.268Z', '2022-02-19T08:40:33.268Z');