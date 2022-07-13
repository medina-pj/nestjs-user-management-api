## Description

This project was created using [NestJS](https://github.com/nestjs/nest) CLI .

## How do I get set up?

- Install mysql database (https://dev.mysql.com/doc/mysql-getting-started/en/).
- Create a new database named mydb or you may choose your own database name.
- Clone this repository.
- Create .env file in the root folder of the project follow the format of env.example located in the root folder.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# run the application
$ npm run start:dev

# open new terminal then run database seeder
$ npm run seed:run

```

## Test

- Go to (http://localhost:3000/documentation#/Auth/AuthController_signIn).
- Execute the endpoint and copy the jwt access token result.
- Paste jwt access token in the authorize option located on the upper right of swagger ui.
- You can now use the different api endpoints.
