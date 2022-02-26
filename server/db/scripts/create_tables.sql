CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS todos (
    id uuid DEFAULT uuid_generate_v4(), 
    description TEXT NOT NULL, 
    deadline TIMESTAMP WITH TIME ZONE, 
    priority INTEGER DEFAULT 0, 
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS projects (
    id uuid DEFAULT uuid_generate_v4(), 
    name TEXT UNIQUE NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS project_todos (
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