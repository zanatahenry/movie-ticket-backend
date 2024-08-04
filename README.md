## Getting Started
1. Clone this repository:
```bash
  git clone https://github.com/zanatahenry/movie-challenge
```
2. Install the dependencies:
```bash
  yarn install
```

3. Configure env variables:
```bash
  MONGO_DATABASE_CLUSTER=
  MONGO_DATABASE_NAME=
  MONGO_DATABASE_PASSWORD=
  MONGO_DATABASE_USERNAME=

  PORT=
  PROCEDURE=

  MOVIE_DB_API_KEY=
  MOVIE_DB_URL=

  DATABASE_URL=

  AUTH_PRIVATE_KEY=
  AUTH_EXPIRES_IN=
```

4. Run prisma migrate:
```bash
  yarn prisma migrate deploy
```

5. Start the project:
```bash
  yarn dev
```