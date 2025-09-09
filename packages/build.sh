#!/usr/bin/env bash
set -e

cleanup() {
  echo
  echo "Stopping containers..."
  docker-compose down
}
trap cleanup SIGINT SIGTERM

# 1. Start the database
docker-compose up -d db

# 2. Wait for DB ready
until docker exec backend-db pg_isready -U bookspank -d bookspank_dev > /dev/null 2>&1; do
  echo -n "."
  sleep 2
done
echo "PostgreSQL is ready!"

# 3. Flyway migrations
(
  cd backend
  mvn org.flywaydb:flyway-maven-plugin:10.20.0:migrate \
    -Dflyway.url=jdbc:postgresql://localhost:5432/bookspank_dev \
    -Dflyway.user=bookspank \
    -Dflyway.password=password \
    -Dflyway.locations=filesystem:src/main/resources/db/migration
)

# 4. jOOQ code generation
(
  cd backend
  mvn jooq-codegen:generate
)

# 5. Start backend
docker-compose up --build backend