# Task Management REST API

A backend REST API for managing tasks, built with **Node.js, Express.js, MongoDB, and JWT authentication**.

This project was developed as a practical backend project to learn and implement REST API development, authentication, database operations, validation, error handling, filtering, searching, sorting, pagination, and automated testing.

## 🚀 Features

* User registration and login
* JWT-based authentication
* Protected API routes
* User-specific task management
* Create, read, update, and delete tasks
* Task status management
* Task priority management
* Task due dates
* Search tasks
* Filter tasks
* Sort tasks
* Pagination
* MongoDB database integration using Mongoose
* Request validation
* Centralized error handling
* Async error handling
* Automated API testing
* Production-ready environment variables

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)

### Development & Testing

* Postman
* Jest / Supertest
* Git & GitHub
* dotenv

## 📁 Project Structure

```text
task-management-rest-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   │
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── Task.js
│   │   └── user.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   │
│   └── utils/
│       └── AppError.js
│
├── tests/
│   └── task.test.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/PrakashNath/task-management-rest-api.git
```

### 2. Navigate to the project

```bash
cd task-management-rest-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit your `.env` file to GitHub.

### 5. Start the server

For production-style execution:

```bash
npm start
```

For development with Nodemon:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

## 🔐 Authentication

The API uses **JWT (JSON Web Token)** authentication.

### Authentication Flow

```text
Register
   ↓
Login
   ↓
JWT Token
   ↓
Authorization Header
   ↓
Protected Routes
```

For protected requests, send the token using:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📌 API Endpoints

### Authentication

| Method | Endpoint             | Description                | Authentication |
| ------ | -------------------- | -------------------------- | -------------- |
| POST   | `/api/auth/register` | Register a new user        | No             |
| POST   | `/api/auth/login`    | Login user and receive JWT | No             |

### Tasks

| Method | Endpoint         | Description         | Authentication |
| ------ | ---------------- | ------------------- | -------------- |
| GET    | `/api/tasks`     | Get user's tasks    | Yes            |
| GET    | `/api/tasks/:id` | Get a specific task | Yes            |
| POST   | `/api/tasks`     | Create a task       | Yes            |
| PATCH  | `/api/tasks/:id` | Update a task       | Yes            |
| DELETE | `/api/tasks/:id` | Delete a task       | Yes            |

## 📝 Example: Create Task

### Request

```http
POST /api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Body

```json
{
  "title": "Complete API Documentation",
  "description": "Write documentation for the Task Manager API.",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2026-10-15"
}
```

## 🔎 Filtering, Searching & Sorting

The API supports querying tasks using URL parameters.

Example:

```http
GET /api/tasks?status=pending
```

Search:

```http
GET /api/tasks?search=backend
```

Sorting:

```http
GET /api/tasks?sort=-createdAt
```

Multiple filters can also be combined.

Example:

```http
GET /api/tasks?status=pending&priority=high&sort=-createdAt
```

## 📄 Pagination

Tasks can be paginated using `page` and `limit`.

Example:

```http
GET /api/tasks?page=1&limit=10
```

The response includes pagination information such as:

* Current page
* Number of results
* Total tasks
* Total pages

## 👤 User Ownership

Each task belongs to the authenticated user.

```text
User A
 ├── Task 1
 ├── Task 2
 └── Task 3

User B
 ├── Task 4
 └── Task 5
```

User A cannot access User B's tasks.

This is enforced by filtering database operations using the authenticated user's ID.

## 🛡️ Validation & Error Handling

The API includes:

* Request validation
* MongoDB ObjectId validation
* Task status validation
* Task priority validation
* Authentication error handling
* Not-found error handling
* Centralized error middleware
* Async error handling

Supported task statuses:

```text
pending
in-progress
completed
```

Supported priorities:

```text
low
medium
high
```

## 🧪 Testing

The project includes automated tests in the `tests` directory.

Run tests using:

```bash
npm test
```

API endpoints can also be tested using **Postman**.

The project includes Postman collection files for testing the API.

## 🔒 Environment Variables

The following environment variables are required:

| Variable     | Description                        |
| ------------ | ---------------------------------- |
| `PORT`       | Port on which the server runs      |
| `MONGO_URI`  | MongoDB connection string          |
| `JWT_SECRET` | Secret key used to sign JWT tokens |

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/task_manager
JWT_SECRET=your_secret_key
```

**Do not upload your actual `.env` file or database credentials to GitHub.**

## 🌐 Production Deployment

The API can be deployed to platforms such as:

* Render
* Railway
* Fly.io
* Other Node.js-compatible hosting platforms

For production deployment, configure the required environment variables on the hosting platform.

## 🔄 Authentication Testing Flow

The complete production authentication flow can be tested as follows:

```text
Register User
      ↓
Login User
      ↓
Receive JWT
      ↓
Send JWT with Request
      ↓
Create Task
      ↓
Get Tasks
      ↓
Verify User Ownership
```

A second user can be created to verify that users cannot access each other's tasks.

## 📚 Learning Objectives

This project helped practice:

* REST API architecture
* Express.js routing
* MVC-style project structure
* MongoDB and Mongoose
* CRUD operations
* JWT authentication
* Middleware
* Error handling
* API validation
* Query parameters
* Searching and filtering
* Sorting
* Pagination
* Automated testing
* Environment variables
* Git and GitHub
* API deployment

## 👨‍💻 Author

**Prakash Nath**

B.Tech Computer Science Engineering Student

GitHub: [PrakashNath](https://github.com/PrakashNath)

LinkedIn: [Prakash Nath](https://www.linkedin.com/in/prakash-nath-0a4263382/)

## ⭐ Future Improvements

Possible future improvements include:

* Refresh token authentication
* Role-based authorization
* Password reset functionality
* Email verification
* Rate limiting
* API documentation with Swagger/OpenAPI
* Docker support
* CI/CD pipeline

---

⭐ If you find this project useful, consider giving it a star!
