Cypress.Commands.add( "createTodo", ({ description, deadline, priority, isCompleted }) => {
    const todo = {
        description: description,
        deadline: deadline ? deadline : new Date(),
        priority: priority ? priority : 0,
        isCompleted: isCompleted ? isCompleted : false
    }
    cy.request( "POST", "http://localhost:5000/api/todos", todo ) 
})

Cypress.Commands.add( "createProject", ({ name }) => {
    const project = {
        name: name,
        todos: []
    }
    cy.request( "POST", "http://localhost:5000/api/projects", project ) 
})