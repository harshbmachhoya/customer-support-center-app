## Customer Support Center Application

Customer Support Center Application has backend in **NestJS (A NodeJS Framework)**, frontend in **ReactJS** with **TypeScript** & Database in MongoDB (NoSQL).

## Installation & Run Application

### _Using Docker_

Docker container for backend & client has included in each folder with the name Dockerfile. 

Docker compose file with the name docker-compose.yaml is there under root path of main folder, it contains MongoDB container configurations.

Open terminal and run below command to run all the containers together using docker compose file, make sure your docker is running.

```bash
docker-compose up
```
For MongoDB GUI, you can use MongoDB Compass. [Click here](https://www.mongodb.com/try/download/compass) to install.

To connect MongoDB instance of docker, use below connection string,

**mongodb://localhost:27018/csc**

### _Using Local Installs_

### Backend - Server
Use package manager **yarn** to install dependency packages.

```bash
cd backend
yarn install
```

Running the server

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

Server will start on registered PORT (3001)

### Frontend - Client 
Use package manager **yarn** to install dependency packages.

```bash
cd client
yarn install
```
To run the client run below command

```bash
yarn start
```

Client will start on registered PORT (3000)

### MongoDB
To connect MongoDB instance in local, use below connection string,

**mongodb://localhost:27017/csc**

## About Application

Total two users considered,
1. **Customer**: They can register case/query directly without logging to application.
2. **Agent**: Need to login in application. Two Roles, **admin** & **agent**.

Role **admin** has access to look all the agents (list of agents) also admin can create, update & delete the agent.

Role **agent** has access to look all the cases/queries which registered by customers, they can resolve the case.

When **Customer** register a new case, agent will assign automatically based on their availability.

## For Demo & Test purpose follow below instruction

Add 2 entries of role in **roles** collection.

> admin
```json
{
  "name": "admin"
}
```

> agent
```json
{
  "name": "agent"
}
```

Add a new entry of admin user with role defined as **admin** in **users** collection,

```json
{
  "fullName": "Admin",
  "email": "admin@admin.com",
  "password": "admin",
  "role": {
    "_id": "<PASTE HERE _id OF ADMIN ROLE FROM roles COLLECTION>",
    "name": "admin"
  }
}
```
Go to URL **[localhost:3000/home](http://localhost:3000/home)**, home page for customer to register query.

Click on **Agent Login** link to Sign Up using admin credentials which we've added above. Then admin can add agents. Agent with same email will not allow as email is the a unique. All agents are listed & admin can edit & delete the agent.

After adding agents with **agent** role. Use same credentials to log into agent account, where agent can see registered cases. To resolve case click on RESOLVE button. **Only Pending case could be resolve**.

## Folder Structure
>Backend

    .
    ├── ...
    ├── src                # source code
    │   ├── case           # Case Module contains module, controller, service & test files
    │   ├── schemas        # Schema for case, user & role models
    │   ├── user           # User Module contains module, controller, service & test files
    │   ├── validations    # Validation file. Zod validation schemas & MongoDB Exception Filter
    │   └── ......
    └── ......

>Client

    .
    ├── ...
    ├── src                # source code
    │   ├── api            # Contains API file which communicate to server for CRUD operation using Axios
    │   ├── components     # Module wise components (Form, List) and contains relevant hooks
    │   ├── constants      # Define constants which is used by multiple files within client 
    │   ├── interface      # Module wise interfaces 
    │   ├── utils          # Common utils like API connection
    │   └── ......
    └── ......

## License

[MIT](https://choosealicense.com/licenses/mit/)