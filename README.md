# BookSpank
Website and backend for BookSpank.com

## Project Overview
The project contains a Next.js frontend, a containerized Java SpringBoot backend api which has database access, and a postgres container. 
My vision for the project is a location for use to keep a list of books each of us would like to read and a page for all of the books 
that we have read along with any reviews if we'd like to add.

To Read: 
- [SST](https://sst.dev)
- [Next.js](https://nextjs.org)
- [SpringBoot](https://spring.io/projects/spring-boot)

### Running the project
You will need node installed, I'm using v23.11.0 currently. 
You will need docker
You will need java installed, I'm using 21.0.8 currently.

Once you clone, 
- run ```npm install``` in the top directory
- run ```mvn clean install``` in the /packages/backend directory
- run ```npx sst dev``` in the top directory to start everything and get the sst multiplexer
- run ```npm run dev:local``` to run locally

#### Note
The backend setup is a little bit janky at the moment. I'm using a java tool to run migrations and another tool to generate types from those migrations.
But, I kept getting a weird error when trying to get those to run the 'right' way, so I kinda bootlegged it. All the startup/setup should work if you run 
the build.sh file or if you run ```npx sst dev```, which should run the build.sh file for you - see /infra/backend


### Infrastructure
All infrastructure is defined in ```/infra``` folder. I haven't really played with that much, as I've just been working locally so far. 
I have an auth server running [OpenAuth](https://openauth.js.org/), the backend java service, a cluster to run it, a database, the next.js site, and a
vpc to hold all of it defined and linked in this folder. As I mentioned, I haven't deployed anything yet, so might be some bugs to figure out there

### Backend
The whole purpose of making this was really to get some practice with SpringBoot, so this setup is way more than we really need. I've got tests setup that 
you can run with ```mvn test```, but it will require you to have the generated types, see above.

### Local Auth
When you go through the auth flow, we dont have an email address setup to send. You can find your login code
in the Docker container logs

<img width="1460" height="883" alt="Screenshot 2025-09-27 at 1 12 06 PM" src="https://github.com/user-attachments/assets/e5e5d62a-efac-417b-80d5-f8dd42879c39" />

## Misc
- run jooq db code gen ```mvn jooq-codegen:generate```
- docker connect ``` psql -h localhost -U bookspank -d bookspank_dev ``
- To make changes to the flyway migrations locally, run ``` npm run dev:local wipe-db ``` to delete the database locally and start fresh
