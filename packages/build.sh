#!/usr/bin/env bash
set -e


# Function to clean up containers
cleanup() {
    echo
    echo "Stopping containers..."
    docker-compose down
    exit 1
}

# Trap Ctrl+C (SIGINT) and call cleanup
trap cleanup SIGINT

# 1. Start the database only
echo "Starting database..."
docker-compose up -d db

# 2. Wait for DB to be healthy
echo "Waiting for PostgreSQL to be ready..."
until docker exec backend-db pg_isready -U bookspank -d bookspank_dev > /dev/null 2>&1; do
  echo -n "."
  sleep 2
done
echo "PostgreSQL is ready!"

# 3. Run Flyway migrations - leaves them local to be copied to backend build
echo "Running database migrations..."
(
  cd backend
  mvn org.flywaydb:flyway-maven-plugin:10.20.0:migrate  \
      -Dflyway.url=jdbc:postgresql://localhost:5432/bookspank_dev \
      -Dflyway.user=bookspank \
      -Dflyway.password=password \
      -Dflyway.locations=filesystem:src/main/resources/db/migration

)
# 4. Run jOOQ code generation
echo "Running jOOQ code generation..."
(
  cd backend
   mvn jooq-codegen:generate
)

# 5. Build and start the backend
echo "Building backend..."
docker-compose up --build -d backend

echo "All done! Backend is running on port 8080."

# ---------------------------
# Keep script alive to capture Ctrl+C
# ---------------------------
echo "Press Ctrl+C to stop and clean up containers..."
while true; do
  sleep 1
done