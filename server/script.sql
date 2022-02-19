CREATE TABLE todo (
    id SERIAL PRIMARY KEY, 
    description text NOT NULL, 
    deadline date, 
    priority integer, 
    is_completed boolean
);

INSERT INTO todo (description, deadline, priority, is_completed)
VALUES 
    ('Todo 1', '2022-02-18T08:40:33.268Z', 0, false),
    ('Todo 2', '2022-02-18T08:40:33.268Z', 1, false);