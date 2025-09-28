#!/bin/bash
set -e

echo "🚀 Starting BookSpank in Local Development Mode"
echo "================================================"

# Set environment variables for local development
export LOCAL_DEV=true
export NODE_ENV=development
export NEXT_PUBLIC_STAGE=local
export NEXT_PUBLIC_SITE_URL=http://localhost:3000
export NEXT_PUBLIC_AUTH_URL=http://localhost:3001
export NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8080

# git root
REPO_ROOT=$(git rev-parse --show-toplevel)

# for jumping between dirs
JAVA_DIR="${REPO_ROOT}/packages/backend"
NEXTJS_DIR="${REPO_ROOT}/packages/aws-nextjs"

cleanup() {
  echo
  echo "🛑 Stopping all containers..."
  docker compose -f "${REPO_ROOT}/dev/docker-compose.yml" down
}
trap cleanup SIGINT SIGTERM

echo "📦 Starting PostgreSQL database..."
# cd packages
docker compose -f "${REPO_ROOT}/dev/docker-compose.yml" up -d db

echo "⏳ Waiting for database to be ready..."
until docker exec backend-db pg_isready -U bookspank > /dev/null 2>&1; do
  echo -n "."
  sleep 2
done
echo "✅ PostgreSQL is ready!"

# If requested, wipe db
if [ "$1" == "wipe-db" ]; then
  echo "🧹 Wiping existing database..."
  PGPASSWORD=password psql -h localhost -U bookspank -d postgres -c "DROP DATABASE bookspank_dev;" 2>&1 && echo "🧹 Dropped existing bookspank_dev database" || echo "No existing bookspank_dev database to drop"
fi

echo "🔧 Ensuring bookspank_dev database exists..."
docker exec backend-db psql -U bookspank -d postgres -c "CREATE DATABASE bookspank_dev;" 2>&1 || echo "Database bookspank_dev already exists or was created automatically"

echo "🔄 Running database migrations..."
cd $JAVA_DIR
mvn org.flywaydb:flyway-maven-plugin:10.20.0:migrate \
  -Dflyway.url=jdbc:postgresql://localhost:5432/bookspank_dev \
  -Dflyway.user=bookspank \
  -Dflyway.password=password \
  -Dflyway.locations=filesystem:src/main/resources/db/migration

echo "🏗️ Generating jOOQ code..."
mvn jooq-codegen:generate \
  -Ddb.url=jdbc:postgresql://localhost:5432/bookspank_dev \
  -Ddb.user=bookspank \
  -Ddb.password=password

echo "🔨 Building and starting backend..."
cd -
docker compose -f "${REPO_ROOT}/dev/docker-compose.yml" up --build -d backend

echo "🌐 Starting Next.js frontend..."
cd $NEXTJS_DIR
npm run dev &
echo "Frontend running..."

cd -
echo "Starting auth server..."
docker compose -f "${REPO_ROOT}/dev/docker-compose.yml" up --build -d auth
echo "Auth server running..."

echo ""
echo "✅ Local development environment is ready!"
echo "📍 Frontend: http://localhost:3000"
echo "   Auth: http://localhost:3001"
echo "🔧 Backend: http://localhost:8080"
echo "💾 Database: localhost:5432"
echo ""
echo "💡 Authentication is mocked for local development"
echo "🛑 Press Ctrl+C to stop all services"

# Wait for frontend to exit
wait