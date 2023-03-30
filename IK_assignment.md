# Assignment

## Intro
This assignment will be used as a discussion during a technical interview. \
Time constraints are part of software development and even though we don't expect a perfect solution, imagine your code to be on its way to production. \
If you have to make compromises, provide a README to briefly explain pros and cons of your approach, what considerations you would make for another iteration and in general what your 
future colleagues might be interested in if they had to pick up your code.

## The Task
The assignment is to design a simple software for a Customer Support Center.

### Requirements:
- The Customer Support Center wants to _add_, _edit_ and _remove_ Support Agents.
- Customers want to be able to report a case for returning a product.
- Your software should assign an available Support Agent to handle a case _automatically_
- Support Agents should be able to _list_ and _resolve_ all the current active cases. Customers can _add_ a new case. An agent can have only **one** case at a time.
- When the case is resolved, it should be marked so and the Support Agent should be free to take a new case

### Your goal:
- Create a Fullstack application (Frontend + Backend + Database) to solve the above problem
- Simple UI where a Customer can _report_ a case and the Customer Support Center can _add_ a new Support Agent and/or resolve a case
- Show that you care for Software design and architecture
- Show your knowledge beyond boilerplate endpoints!

### Tech recommendations
- Typescript
- ReactJS
- NestJS
- Any DB is okay (In-memory, NoSQL, SQL)

### Bonus:
- Validations (UI, API, DB)
- Tests
- Attention to CI/CD (Githubs Actions or similar)
- Docker/Terraform

The expected deliverable is the source code published on github with instructions on how to execute and test it.
