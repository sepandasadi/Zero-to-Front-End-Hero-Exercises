# Docker Compose - Solution

This is the complete solution for Exercise 3: Docker Compose Full-Stack Application.

## Architecture

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Frontend │────▶│ Backend  │────▶│PostgreSQL│     │  Redis   │
│  React   │     │ Node.js  │     │ Database │     │  Cache   │
│  :3000   │     │  :5000   │     │  :5432   │     │  :6379   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
      │                 │                 │                │
      └─────────────────┴─────────────────┴────────────────┘
                    app-network (bridge)
```

## What's Included

### 1. docker-compose.yml
Complete orchestration of 4 services with:
- Service definitions
- Port mappings
- Volume mounts for data persistence
- Hot reload for development
- Network configuration
- Health checks
- Restart policies

### 2. Dockerfiles
- `frontend/Dockerfile` - React development container
- `backend/Dockerfile` - Node.js with nodemon

### 3. Application Code
- Frontend: React app with task management
- Backend: Express API with PostgreSQL and Redis

## How to Use

### Start All Services

```bash
docker-compose up
```

Or in detached mode:
```bash
docker-compose up -d
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

### Stop Services

```bash
# Stop containers (keep data)
docker-compose down

# Stop and remove volumes (delete data)
docker-compose down -v
```

### Rebuild Images

```bash
docker-compose up --build
```

### Access Services

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health
- **PostgreSQL:** localhost:5432
- **Redis:** localhost:6379

## Testing the Solution

### 1. Start Services
```bash
docker-compose up -d
```

### 2. Check All Services Are Running
```bash
docker-compose ps
```

Should show 4 services: frontend, backend, database, cache

### 3. Test Frontend
Visit http://localhost:3000

### 4. Test Backend API
```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"ok","message":"Backend is running"}`

### 5. Test Task Creation
Add a task through the UI, then refresh - should persist!

### 6. Test Redis Caching
```bash
# Watch backend logs
docker-compose logs -f backend

# Add a task
# First fetch: "Cache miss"
# Refresh page: "Cache hit"
```

### 7. Test Data Persistence
```bash
# Add some tasks
# Stop containers
docker-compose down

# Start again
docker-compose up -d

# Check frontend - tasks should still be there!
```

### 8. Test Hot Reload

**Frontend:**
Edit `frontend/src/App.js` - changes should appear immediately

**Backend:**
Edit `backend/server.js` - server should restart automatically

## Key Concepts

### Service Discovery

Services can reach each other by service name:
```javascript
// Backend connects to database
host: 'database'  // Not localhost!

// Frontend proxies to backend
proxy: 'http://backend:5000'
```

### Volume Types

**Named Volumes (Data Persistence):**
```yaml
volumes:
  - postgres-data:/var/lib/postgresql/data
```
Data persists after `docker-compose down`

**Bind Mounts (Hot Reload):**
```yaml
volumes:
  - ./frontend/src:/app/src
```
Local files sync with container

### Service Dependencies

```yaml
depends_on:
  database:
    condition: service_healthy
```

Backend waits for database to be healthy before starting.

### Networks

All services are on the same `app-network`, allowing them to communicate.

### Health Checks

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U postgres"]
  interval: 10s
```

Docker monitors service health automatically.

## Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# List running services
docker-compose ps

# Execute command in service
docker-compose exec backend sh

# Rebuild images
docker-compose build

# Rebuild and start
docker-compose up --build

# Scale a service
docker-compose up --scale backend=3

# View resource usage
docker-compose top
```

## Troubleshooting

### Services not starting?

Check logs:
```bash
docker-compose logs
```

### Can't connect to database?

Ensure backend waits for database health check:
```yaml
depends_on:
  database:
    condition: service_healthy
```

### Port already in use?

Change port mapping in docker-compose.yml:
```yaml
ports:
  - "3001:3000"  # Use 3001 instead of 3000
```

### Data not persisting?

Make sure you're using named volumes:
```yaml
volumes:
  postgres-data:/var/lib/postgresql/data
```

Don't use `docker-compose down -v` if you want to keep data!

### Hot reload not working?

**Frontend:** Add `CHOKIDAR_USEPOLLING=true` to environment

**Backend:** Make sure nodemon is installed and `npm run dev` is used

## What You Learned

1. ✅ Docker Compose orchestration
2. ✅ Multi-container applications
3. ✅ Service networking
4. ✅ Volume management (named volumes vs bind mounts)
5. ✅ Service dependencies and health checks
6. ✅ Hot reload in Docker
7. ✅ Environment variables
8. ✅ Data persistence

## Next Steps

Move on to [Exercise 4: CI/CD Pipeline](../exercise-04-cicd-pipeline/README.md) to learn about:
- GitHub Actions workflows
- Automated Docker builds
- Container registries
- Multi-platform images

Great job! You now know how to orchestrate complex multi-container applications! 🎉

