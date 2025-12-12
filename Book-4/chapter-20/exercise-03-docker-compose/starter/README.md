# Docker Compose - Starter

This is the starter code for Exercise 3: Docker Compose Full-Stack Application.

## Architecture

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Frontend │────▶│ Backend  │────▶│PostgreSQL│     │  Redis   │
│  React   │     │ Node.js  │     │          │     │  Cache   │
│  :3000   │     │  :5000   │     │  :5432   │     │  :6379   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
```

## Your Task

Create a `docker-compose.yml` file that orchestrates all four services:

### 1. Frontend Service
- Build from `./frontend`
- Port: 3000:3000
- Depends on backend
- Hot reload with volume mounting

### 2. Backend Service
- Build from `./backend`
- Port: 5000:5000
- Depends on database and redis
- Environment variables for connections
- Hot reload with volume mounting

### 3. Database Service (PostgreSQL)
- Image: `postgres:15-alpine`
- Port: 5432:5432
- Environment: POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD
- Volume for data persistence

### 4. Cache Service (Redis)
- Image: `redis:7-alpine`
- Port: 6379:6379
- Volume for data persistence

## Files to Create

### 1. docker-compose.yml
Main orchestration file

### 2. frontend/Dockerfile
Dockerfile for React app

### 3. backend/Dockerfile
Dockerfile for Node.js backend

### 4. .env (optional)
Environment variables

## Running Locally (Without Docker)

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm install

# Set environment variables
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=taskdb
export DB_USER=postgres
export DB_PASSWORD=postgres
export REDIS_HOST=localhost
export REDIS_PORT=6379

npm start
```

You'll also need PostgreSQL and Redis running locally.

## Running with Docker Compose

Once you create your docker-compose.yml:

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Success Criteria

- [ ] All 4 services start successfully
- [ ] Frontend accessible at http://localhost:3000
- [ ] Backend API works (check network tab)
- [ ] Tasks persist in PostgreSQL
- [ ] Redis caching works (check backend logs)
- [ ] Hot reload works for frontend and backend
- [ ] Data persists after `docker-compose down` (without -v)

## Testing

1. **Visit frontend:** http://localhost:3000
2. **Add a task:** Should appear in the list
3. **Check backend logs:** Should see "Cache miss"
4. **Refresh page:** Should see "Cache hit"
5. **Stop containers:** `docker-compose down`
6. **Start again:** `docker-compose up -d`
7. **Check tasks:** Should still be there (data persisted!)

## Hints

**Service networking:**
Services can communicate using service names as hostnames.
Example: `http://backend:5000` or `postgres://database:5432`

**Volume mounting for hot reload:**
```yaml
volumes:
  - ./frontend/src:/app/src
```

**Data persistence:**
```yaml
volumes:
  - postgres-data:/var/lib/postgresql/data
```

Good luck! 🚀

See the [Exercise README](../README.md) for detailed instructions.

