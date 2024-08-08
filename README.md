# Getting Started

1. Clone this repository:
```bash
  git clone https://github.com/zanatahenry/movie-ticket-backend.git
```
2. Make sure Yarn is installed:
```bash
  yarn --version
```
4. If yarn is not installed, run these commands:
```bash
  npm install --global yarn
```

3. Install the dependencies:
```bash
  yarn install
```

4. Configure env variables:
```bash
  MONGO_DATABASE_CLUSTER=
  MONGO_DATABASE_NAME=
  MONGO_DATABASE_PASSWORD=
  MONGO_DATABASE_USERNAME=

  MYSQL_USER=
  MYSQL_PASSWORD=
  MYSQL_ROOT_PASSWORD=
  MYSQL_DATABASE=

  PORT=
  JOB_PORT=
  PROCEDURE=

  MOVIE_DB_API_KEY=
  MOVIE_DB_URL=

  DATABASE_URL=

  AUTH_PRIVATE_KEY=
  AUTH_EXPIRES_IN=
```

### If you are not using Docker, follow these steps:

> [!NOTE]
>  If you need to run the MongoDB and MySQL locally, run these commands:
> ```bash
> docker run --name movie-ticket-mongodb -d mongo:latest
> docker run --name movie-ticket-sql --env-file .env -d mysql:5.7
> ```

1. Run prisma migrate:
```bash
  yarn prisma migrate deploy
```

2. Start the project:
```bash
  yarn dev
```

### Or

1. Run Docker:
```bash
  yarn docker
```

<hr/>

### :warning: IMPORTANT
Please download the `postman-config.json` file from the Postman folder and import it into your Postman collection.
