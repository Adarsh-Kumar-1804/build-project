# Observability Dashboard 

A project to track code commits to the database and provide insights in form of metrics and logs which would help in monitoring the quality of code and provide alerts wherever needed.


### Technical Stacks Used

* **NodeJS** - For Setting up the Server.
* **ExpressJS** - For building RESTful Endpoints.
* **React** -  For building the front-end dashboard to view project health.
* **Material-UI** - React Framework for building and designing components of the project.


## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environment.

## Getting started
- Clone the repository
```
git clone https://github.com/Adarsh-Kumar-1804/build-project
```
- Install dependencies
```
cd projects
npm install
```
- Run the project
```
npm run start
```


## Project Structure
The folder structure of this app is explained below:


| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **projects/src**                  | Contains  source code that will be compiled.                               |
| **projects/src/data**                  | Contains  Mock data for testing REST API Endpoints                               |
| **projects/src/services**      | Services defined functions to serve various express routes. 
| **projects/src/routes**           | Contain all express routes, separated by module/area of application                       
| package.json             | Contains npm dependencies as well as [build scripts]| 

# ESLint
ESLint is a code linter that helps catch minor code quality and style issues.

## ESLint rules
All rules are configured through `.eslint.json`.


## Running ESLint
To run ESLint you can call the ESLint task.
```
npm run lint  // runs only ESLint
```

