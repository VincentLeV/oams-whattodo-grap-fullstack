/* Get all todos */
SELECT * FROM todos;

/* Get a todo */
SELECT * FROM todos WHERE id = 'c050b96e-1abf-403d-9816-93f70c1ce531';

/* Create a todo */
INSERT INTO todos (description, deadline, priority, is_completed, created_at, updated_at)
VALUES ('Todo', '2022-02-18T08:40:33.268Z', 1, false, '2022-02-19T08:40:33.268Z', '2022-02-19T08:40:33.268Z');

/* Update a todo */
UPDATE todos
SET description = 'Low', 
	deadline = '2022-02-19T08:40:33.268Z', 
	priority = 0, 
	is_completed = true
WHERE id = 'ecd17c66-c98b-41bd-92f2-60df4a1a482e';

/* Delete a todo */
DELETE FROM todos where id = 'c050b96e-1abf-403d-9816-93f70c1ce531';

/* Get a medium-priority todo */
SELECT * FROM todos 
WHERE priority = 2;

/* Get all todos that have deadline in March 2022 */
SELECT * FROM todos
WHERE DATE(deadline) <= '2022-03-31' AND DATE(deadline) >= '2022-03-01';

/* Get all todos that were created on February 2022 */
SELECT * FROM todos
WHERE DATE(created_at) <= '2022-02-24' AND DATE(created_at) >= '2022-02-01';