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

  echo "🛑 Killing frontend process..."
  if [[ ! -z "$FRONTEND_PID" ]]; then
    kill -9 $FRONTEND_PID 2>/dev/null || true
  fi
}
trap cleanup SIGINT SIGTERM

echo "📦 Starting PostgreSQL database..."
# cd packages
docker compose -f "${REPO_ROOT}/dev/docker-compose.yml" up -d db

echo "⏳ Waiting for database to be ready..."
until docker exec backend-db pg_isready -U bookspank -d bookspank_dev > /dev/null 2>&1; do
  echo -n "."
  sleep 2
done
echo "✅ PostgreSQL is ready!"

echo "🔄 Running database migrations..."
cd $JAVA_DIR
mvn org.flywaydb:flyway-maven-plugin:10.20.0:migrate \
  -Dflyway.url=jdbc:postgresql://localhost:5432/bookspank_dev \
  -Dflyway.user=bookspank \
  -Dflyway.password=password \
  -Dflyway.locations=filesystem:src/main/resources/db/migration

echo "🏗️ Generating jOOQ code..."
mvn jooq-codegen:generate

echo "🔨 Building and starting backend..."
cd -
docker compose -f "${REPO_ROOT}/dev/docker-compose.yml" up --build -d backend

echo "🌐 Starting Next.js frontend..."
cd $NEXTJS_DIR
npm run dev &
FRONTEND_PID=$!
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