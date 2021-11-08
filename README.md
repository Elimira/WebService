## Description

This project was bootstrapped with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Table of Contents
- [Folder Structure](#folder-structure)
- [Running Program](#available-scripts)
  - [Running the app with docker](#running-the-app-with-docker)
  - [Running the app locally](#running-the-app-locally)
- [Test](#test)
- [Access Databases](#access-databases)

 ## Folder Structure

```
WebService
├── Dockerfile
├── README.md
├── dist
├── docker-compose.yml
├── nest-cli.json
├── node_modules
├── package.json
├── src
    ├── __mocks__
    ├── api-service
    ├── app
    ├── config.ts
    ├── main.ts
    └── mongo
├── test
```

## Available Scripts

### `Running the app with docker`

```bash
 docker-compose build


 docker-compose up
```

### `Running the app locally`

- Install RabbitMQ
- Install Nodejs
- Install npm
- Install yarn


Follow these steps in order in the project directory:

```bash

rabbitmq-server

yarn

yarn build

yarn run start

```

After running locally, you could go to http://localhost:3333/api/ address to Play with apis. 
### Test

```bash

yarn run test:e2e

```


## Access Databases
 
  ### Docker
  - After configuring everything `docker-compose up` runs a new mongodb container.
  - It stores database data inside a docker volume `mongodb_data`.
  - __When mongo container is running__  Mongo is exposed to port 29017  so:
    - you can restore old db files using `mongorestore -h localhost --port 29017` 
    - you can connect with a mongo IDE/GUI like [Studio 3t](https://studio3t.com) or just run
      ```bash
      $ docker exec -it web_mongo_1 mongo --port 29017
      ```
  ### Locally
  - Mongo is exposed to port 27017
