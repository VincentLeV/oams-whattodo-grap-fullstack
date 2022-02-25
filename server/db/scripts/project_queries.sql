/* Get all projects */
SELECT * FROM projects;

/* Get a project */
SELECT * FROM projects WHERE id = 'c050b96e-1abf-403d-9816-93f70c1ce531';

/* Create a project */
INSERT INTO projects (name)
VALUES ('Project');

/* Update a project */
UPDATE projects
SET name = 'New Project', 
WHERE id = 'ecd17c66-c98b-41bd-92f2-60df4a1a482e';

/* Delete a project */
DELETE FROM projects where id = 'c050b96e-1abf-403d-9816-93f70c1ce531';

/* Get all todos from a project */
SELECT 
    project_todos.id,
	project_todos.project_id,
	projects.name, 
	project_todos.description,
	project_todos.priority,
	project_todos.deadline,
	project_todos.is_completed
FROM projects
JOIN project_todos ON project_todos.project_id = projects.id;

/* Get all incompleted todos from a project */
SELECT
    project_todos.id,
	project_todos.project_id, 
	projects.name, 
	project_todos.description,
	project_todos.priority,
	project_todos.deadline,
	project_todos.is_completed
FROM projects
JOIN project_todos ON project_todos.project_id = projects.id
WHERE 
    project_todos.project_id = 'c0ac4e56-ef01-4fbc-a219-5e8a7e2b3008' 
    AND
    project_todos.is_completed = false;

/* Get all high-priority todos from a project */
SELECT 
    project_todos.id,
	project_todos.project_id,
	projects.name, 
	project_todos.description,
	project_todos.priority,
	project_todos.deadline,
	project_todos.is_completed
FROM projects
JOIN project_todos ON project_todos.project_id = projects.id
WHERE 
    project_todos.project_id = '08d69159-8bac-48e3-b3b8-60da45cd0a5a' 
    AND
    project_todos.priority = 3;

/* Get all todos that have deadline in March 2022 from a project */
SELECT 
    project_todos.id,
	project_todos.project_id,
	projects.name, 
	project_todos.description,
	project_todos.priority,
	project_todos.deadline,
	project_todos.is_completed
FROM projects
JOIN project_todos ON project_todos.project_id = projects.id
WHERE 
    project_todos.project_id = 'c0ac4e56-ef01-4fbc-a219-5e8a7e2b3008' 
    AND
    DATE(project_todos.deadline) <= '2022-03-31' AND DATE(project_todos.deadline) >= '2022-03-01';