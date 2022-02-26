[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/vincentlev/oams-whattodo-grap-fullstack)
[![License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
![](https://img.shields.io/netlify/66060c97-0112-4fa6-9142-4d28d8e79834?style=flat-square)
![](https://img.shields.io/github/issues-raw/VincentLeV/oams-whattodo-grap-fullstack?style=flat-square)
<br/>

# WhatToDo (GRAP)

## Table of Contents
[Introduction](#introduction)
<br/>
[Features](#features)
<br/>
[Tech Stack](#tech-stack)
<br/>
[Run The Project Locally](#run-the-project-locally)
<br/>
[UI Examples](#ui-examples)
<br/>
[Demo](#demo)

## Introduction
This is a very basic CRUD todo-list fullstack application. It's a part of my "One App Multi-stacks" series. This version is created with REACTJS (frontend), NodeJS, GraphQL & Apollo-Server (backend), PostgreSQL (database).

The purpose of the project is practicing my fullstack development skill and the technology. 

## Features
For simplicity's sake, there is no user feature in the app.

- Create/Read/Update/Delete todos (priority, deadline, description)
- Create/Read/Update/Delete projects
- Create/Read/Update/Delete Projects' todos

## Tech Stack
1. ReactJS
2. MaterialUI
3. Cypress
4. GraphQL
5. Apollo-Server
6. PostgreSQL

## Run The Project Locally

:loudspeaker: For all of the step below: make sure that you're in the project's directory :loudspeaker:
### Using Terminal and VSCode

1. Run the Backend
        
        cd server
        npm run start

2. Run the Frontend

        cd client
        yarn start

<p align="center">Check the app out at <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a></p>

### E2E Testing

    yarn run cypress

## UI Examples
<p align="center">
    <img src="https://user-images.githubusercontent.com/49280437/151970734-96c7f0da-ba46-4844-8506-1fd5e2f6f211.jpg" alt="1" width="500px" />
</p>

<p align="center">
    <img src="https://user-images.githubusercontent.com/49280437/151970745-dcfffc15-cf84-4ae4-9710-50abedfa8b7c.jpg" alt="2" width="500px" />
</p>

<p align="center">
    <img src="https://user-images.githubusercontent.com/49280437/151970745-dcfffc15-cf84-4ae4-9710-50abedfa8b7c.jpg" alt="3" width="500px" />
</p>

## Demo
<a href="https://oams-whattodo-mern.netlify.app" target="_blank">
    <p align="center">https://oams-whattodo-grap.netlify.app</p>
</a>

<p align="center">
    <img src="https://user-images.githubusercontent.com/49280437/151970803-9734962c-e20c-420c-b123-156fb9bbca67.gif" alt="gif" />
</p>