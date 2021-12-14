<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 ## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repo with config and db modules

## Installations
1. Install [Docker](https://www.docker.com/get-started)
2. Verify that Docker and Docker Compose is installed by running `docker version` and `docker-compose version`
3. Further more, verify that docker daemon is running by running `docker run hello-world` you should see a hello world print from the pulled docker container.(use sudo if required)

## Running the app
1. While in root directory, run `docker-compose -f docker/docker-compose.yml up` to run the whole stack.
2. First run will take a while to pull the test and dev DBs and build the image.
3. When everything is up and running, run `curl 127.0.0.1:3001/api` in terminal to verify that the server is up and running.

## Running tests
1. To run tests you may run `npm run test` in root directory which will pass the test commmand to the docker container to run the tests.
2. To run tests directly on your host machine (not recommended) you may run `npm run test:host` in root directory
