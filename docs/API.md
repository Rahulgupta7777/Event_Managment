# 📚 API Documentation

Welcome to the Event Management System API documentation. This API provides endpoints for managing events, users, and registrations.

## 🔗 Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## 🔐 Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📋 Table of Contents

- [Authentication](#-authentication-endpoints)
- [Events](#-event-endpoints)
- [Users](#-user-endpoints)
- [Registrations](#-registration-endpoints)
- [Error Handling](#-error-handling)
- [Rate Limiting](#-rate-limiting)

## 🔑 Authentication Endpoints

### Register User

Create a new user account.

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user" // optional, defaults to "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### Login User

Authenticate a user and receive a JWT token.

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### Get User Profile

Get the current user's profile information.

```http
GET /api/auth/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## 🎉 Event Endpoints

### Get All Events

Retrieve a list of all events with optional filtering.

```http
GET /api/events
```

**Query Parameters:**
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Number of events per page (default: 10)
- `category` (string): Filter by event category
- `location` (string): Filter by location
- `startDate` (date): Filter events starting from this date
- `endDate` (date): Filter events ending before this date
- `search` (string): Search in event titles and descriptions

**Example:**
```http
GET /api/events?page=1&limit=10&category=conference&search=tech
```

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "event_id",
        "title": "Tech Conference 2024",
        "description": "Annual technology conference",
        "category": "conference",
        "location": "San Francisco, CA",
        "startDate": "2024-06-15T09:00:00.000Z",
        "endDate": "2024-06-15T17:00:00.000Z",
        "capacity": 500,
        "registeredCount": 250,
        "price": 99.99,
        "organizer": {
          "id": "organizer_id",
          "name": "Tech Events Inc"
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalEvents": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Get Single Event

Retrieve details of a specific event.

```http
GET /api/events/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "event": {
      "id": "event_id",
      "title": "Tech Conference 2024",
      "description": "Annual technology conference with industry leaders",
      "category": "conference",
      "location": "San Francisco, CA",
      "venue": "Moscone Center",
      "startDate": "2024-06-15T09:00:00.000Z",
      "endDate": "2024-06-15T17:00:00.000Z",
      "capacity": 500,
      "registeredCount": 250,
      "price": 99.99,
      "tags": ["technology", "networking", "innovation"],
      "organizer": {
        "id": "organizer_id",
        "name": "Tech Events Inc",
        "email": "contact@techevents.com"
      },
      "agenda": [
        {
          "time": "09:00",
          "title": "Registration & Breakfast",
          "speaker": null
        },
        {
          "time": "10:00",
          "title": "Keynote: Future of AI",
          "speaker": "Dr. Jane Smith"
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-02T00:00:00.000Z"
    }
  }
}
```

### Create Event

Create a new event (requires authentication and organizer role).

```http
POST /api/events
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "category": "conference",
  "location": "San Francisco, CA",
  "venue": "Moscone Center",
  "startDate": "2024-06-15T09:00:00.000Z",
  "endDate": "2024-06-15T17:00:00.000Z",
  "capacity": 500,
  "price": 99.99,
  "tags": ["technology", "networking"],
  "agenda": [
    {
      "time": "09:00",
      "title": "Registration & Breakfast"
    }
  ]
}
```

### Update Event

Update an existing event (requires authentication and ownership).

```http
PUT /api/events/:id
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

### Delete Event

Delete an event (requires authentication and ownership).

```http
DELETE /api/events/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

## 👥 User Endpoints

### Get All Users

Get a list of all users (admin only).

```http
GET /api/users
```

### Get User by ID

Get details of a specific user.

```http
GET /api/users/:id
```

### Update User

Update user information.

```http
PUT /api/users/:id
```

### Delete User

Delete a user account.

```http
DELETE /api/users/:id
```

## 🎫 Registration Endpoints

### Register for Event

Register the current user for an event.

```http
POST /api/events/:id/register
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully registered for event",
  "data": {
    "registration": {
      "id": "registration_id",
      "eventId": "event_id",
      "userId": "user_id",
      "status": "confirmed",
      "registeredAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Unregister from Event

Remove registration from an event.

```http
DELETE /api/events/:id/register
```

### Get User Registrations

Get all events the current user is registered for.

```http
GET /api/users/me/registrations
```

## ❌ Error Handling

The API uses standard HTTP status codes and returns errors in the following format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

### Common Error Codes

- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists
- `422 Unprocessable Entity`: Validation errors
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## 🚦 Rate Limiting

The API implements rate limiting to prevent abuse:

- **General endpoints**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **File upload endpoints**: 10 requests per hour per user

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## 📝 Request/Response Examples

### Creating an Event with Full Details

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Development Workshop",
    "description": "Learn modern web development with React and Node.js",
    "category": "workshop",
    "location": "Online",
    "startDate": "2024-07-20T14:00:00.000Z",
    "endDate": "2024-07-20T18:00:00.000Z",
    "capacity": 50,
    "price": 29.99,
    "tags": ["web-development", "react", "nodejs"]
  }'
```

### Searching Events

```bash
curl "http://localhost:3000/api/events?search=workshop&category=education&limit=5"
```

## 🔧 Development Notes

- All timestamps are in ISO 8601 format (UTC)
- Pagination uses 1-based indexing
- File uploads support common image formats (JPG, PNG, GIF)
- Maximum file size: 5MB
- API versioning will be implemented in future releases

## 📞 Support

For API support and questions:
- 📖 Check the [Contributing Guidelines](../CONTRIBUTING.md)
- 🐛 [Report API bugs](https://github.com/GreenHacker420/Event_Managment/issues/new?template=bug_report.md)
- 💡 [Request API features](https://github.com/GreenHacker420/Event_Managment/issues/new?template=feature_request.md)

---

**Note**: This API is under active development. Some endpoints may not be fully implemented yet. Check the [project roadmap](../README.md#roadmap) for current status.
