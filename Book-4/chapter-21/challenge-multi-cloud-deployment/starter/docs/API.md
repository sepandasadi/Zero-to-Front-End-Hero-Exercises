# API Documentation

## Base URL
- Development: `http://localhost:8080`
- Production: `https://YOUR-CLOUD-RUN-URL.run.app`

## Authentication
All endpoints except `/health` require Firebase authentication token.

Include token in header:
```
Authorization: Bearer <firebase-id-token>
```

## Endpoints

### Health Check
```http
GET /health
```
Returns API health status.

### Tasks

#### Get All Tasks
```http
GET /api/tasks
```
Returns all tasks for authenticated user.

**Response:**
```json
{
  "tasks": [
    {
      "id": "task123",
      "title": "Complete project",
      "description": "Finish the multi-cloud deployment",
      "status": "in-progress",
      "priority": "high",
      "userId": "user123",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Create Task
```http
POST /api/tasks
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New task",
  "description": "Task description",
  "priority": "medium"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "done"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": "Title is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 404 Not Found
```json
{
  "error": "Task not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting
- 100 requests per minute per user
- 429 Too Many Requests response if exceeded

## TODO
Complete this documentation as you implement the API.

