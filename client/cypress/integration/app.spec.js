import { wait } from "@testing-library/user-event/dist/utils"

describe("WhatToDo App", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000")
        wait(300)
    })

    it("front page can be opened", function() {
        cy.contains("WhatToDo")
        cy.contains("Todos")
        cy.contains("Projects")
        wait(200)   
    })

    describe("Todo", function() {
        it("front page contains initial todos", function() {
            cy.contains("Low")
            cy.contains("Med")
            cy.contains("High")
            wait(200)
        })
    })

    describe("Project", function() {
        beforeEach(function() {
            cy.get('div[aria-label*="Menu Tabs"]').children().should("have.length", 2).eq(1).click()
        })

        it("contains initial project", function() {
            cy.contains("First Project")
            cy.contains("Second Project")
        })
    })
})