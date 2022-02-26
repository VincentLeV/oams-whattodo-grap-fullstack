import { aliasQuery, aliasMutation } from "../../src/utils/graphql-test-utils"
import { wait } from "@testing-library/user-event/dist/utils"
import { gql } from "@apollo/client"
import { client } from "../../src/graphql-client"

describe("WhatToDo App", function() {
    function DeleteAllTodos() {
        // const client = useApolloClient()
        cy.log("**Delete All Todos")
            .then(() => {
                client.query({
                    fetchPolicy: "no-cache",
                    query: gql`
                        query Todos {
                            todos {
                                id
                            }
                        }
                    `
                })
            })
            .its("data.todos").should("be.an", "array")
            .then(items => Cypress._.map(items, "id"))
            .then(ids => {
                if (!ids.length) {
                    cy.log("Nothing to delete")
                    return
                }

                ids.forEach(id => {
                    const mutation = gql`
                        mutation DeleteTodos {
                            deleteTodos {
                                id
                            }
                        }
                    `
                    cy.log(`Deleting item id: **${id}**`)
                    .then(() => 
                        client.mutate({ mutation }),
                        { log: false }
                    )
                })
            })
    }

    beforeEach(function() {
        DeleteAllTodos()
        cy.visit("http://localhost:3000")
        wait(300)
    })

    it("front page can be opened", function() {
        cy.contains("WhatToDo")
        cy.contains("Todos")
        cy.contains("Projects")
        wait(200)   
    })

    it("front page contains initial todos", function() {
        cy.contains("Todo 1")
        cy.contains("Todo 2")
        wait(200)
    })

    describe("Todo", function() {
        it("can add a task", function() {
            cy.get('button[aria-label*="Add Dial"]').click()
            cy.wait(200)
            cy.get("#AddDial-actions").children().eq(0).click()
            cy.wait(200)
            cy.get("#todo-description-input").type("Testing Implementation")
            cy.get("#add-todo-btn").click()
            cy.get("#todos-container").should("contain", "Testing Implementation")
        })
        
        it("can edit a task", function() {
            cy.get(".edit-todo-btn").eq(1).click()
            cy.get(".edit-menu-item.edit").click()
            cy.get('button[aria-controls*="priority-menu"]').click()
            cy
                .get(".priority-menu-item")
                .should("have.length", 3)
                .eq(1)
                .click()
            cy.get('button[id*="edit-todo-btn"]').click({ multiple: true, force: true })
            cy.get('svg[class*="priority-flag"]').should("have.css", "color").and("eq", "rgb(237, 108, 2)")

            cy.get(".todo-description").should("have.length", 2).eq(0).should("contain", "Initial Task")
        })

        // it("can delete a task", function() {
        //     cy.get(".edit-todo-btn").eq(1).click()
        //     cy.get(".edit-menu-item.delete").click()
        //     cy.get(".todo-description").should("have.length", 1).eq(0).should("contain", "Initial Task 2")
        // })
    })

    // describe("Project", function() {
    //     beforeEach(function() {
    //         cy.get('div[aria-label*="Menu Tabs"]').children().should("have.length", 2).eq(1).click()
    //     })

    //     it("contains initial project", function() {
    //         cy.contains("Test Project")
    //     })

    //     it("can create project", function() {
    //         cy.get('button[aria-label*="Add Dial"]').click()
    //         cy.wait(200)
    //         cy.get("#AddDial-actions").children().eq(1).click()
    //         cy.wait(200)
    //         cy.get("#project-name").type("New Project")
    //         cy.get("#add-project-btn").click()
    //     })

    //     it("can add todo to project", function() {
    //         cy.get("#project-0-header").click()
    //         cy.get(".add-project-todo-btn").click()
    //         cy.get("#todo-description").type("Study")
    //         cy.get("#add-todo-btn").click()
    //     })

    //     it("can edit project", function() {
    //         cy.get("#project-0-header").click()
    //         cy.get(".edit-project-todo-btn").click()
    //         cy.get("#project-name").clear().type("New Project Name")
    //         cy.get("#edit-project-btn").click()
    //         cy.get("#project-0-header").should("contain", "New Project Name")
    //     })

    //     it("can delete project", function() {
    //         cy.get("#project-0-header").click()
    //         cy.get(".delete-project-btn").click()
    //         cy.contains("No Project")
    //     })
    // })
})