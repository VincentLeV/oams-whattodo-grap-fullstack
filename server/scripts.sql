CREATE TABLE todos (
    id uuid DEFAULT uuid_generate_v4(), 
    description TEXT NOT NULL, 
    deadline TIMESTAMP WITH TIME ZONE, 
    priority INTEGER DEFAULT 0, 
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO todos (description, deadline, priority, is_completed, created_at, updated_at)
VALUES 
    ('Todo 1', '2022-02-18T08:40:33.268Z', 0, false, '2022-02-19T08:40:33.268Z', '2022-02-19T08:40:33.268Z'),
    ('Todo 2', '2022-02-18T08:40:33.268Z', 1, false, '2022-02-19T08:40:33.268Z', '2022-02-19T08:40:33.268Z');

CREATE TABLE projects (
    id uuid DEFAULT uuid_generate_v4(), 
    name TEXT UNIQUE NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO projects (name)
VALUES ('Project 1');

CREATE TABLE project_todos (
    id uuid DEFAULT uuid_generate_v4(), 
    project_id uuid,
    description TEXT NOT NULL, 
    deadline TIMESTAMP WITH TIME ZONE, 
    priority INTEGER DEFAULT 0, 
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_project_id
        FOREIGN KEY(project_id) 
        REFERENCES projects(id)
);

