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
├── node_modules
├── package.json
├── src
    ├── __mocks__
    ├── app
    ├── config.ts
    ├── consumer
    ├── main.ts
    ├── mongo
    ├── publisher
    └── store
├── test
```

## Available Scripts

### `Running the app with docker`

```bash
 docker-compose build


 docker-compose up
```
then please go to http://localhost:3333/api/ for accessing exposed apis. 

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
again you could go to http://localhost:3333/api/ for accessing exposed apis. 

### Test

```bash

yarn run test:e2e

```
