# PB-MERN-REST-AUTH

## GQL Getting Started
install a VS Code extension to add GraphQL language support. Go to the Extensions tab and search for the GraphQL.vscode-graphql

$ pnpm install graphql@16.8.1 
 Deprecated --- @apollo/server@4.10.0

$ pnpm install @as-integrations/express5


http://localhost:5004/graphql


## TTD 
- BE add roles to payload
- BE add logout route
- get all userIds and then user details 


- FE restrict pages based on roles -- protected routes
-- FE check token not expired 
- get 
- FE send token each request and check on backend
- FE manage user details and roles and permissions - user roles and permissions component - user admin module?
- Store auth details in local storage with persist middleware zustand

- unit tests
- comments
- dockerize
 



Uses MVC pattern with Controllers, models, routes and services

## Running the server
```bash
"scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
$ npm run dev
$ npm run start

##  create User
{
    "name":"Alok",
    "userId": "alokj1",
    "email":"alokj@gmail.com",
    "password": "abc123"
}

