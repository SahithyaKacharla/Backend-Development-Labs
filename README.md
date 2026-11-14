# Backend Development Fundamentals – Lab Repository

A collection of practical laboratory exercises completed as part of the **Backend Development Fundamentals** course. This repository contains implementations of backend concepts using Node.js, Express.js, databases, REST APIs and authentication.

The objective of this repository is to develop practical knowledge of backend development, server-side programming, database integration and API development.

---

## Student Details

| Field | Details |
|---|---|
| Name | Sahithya Kacharla |
| Registration Number | 252U1R6106 |
| Course | Backend Development Fundamentals |
| Programming Language | JavaScript |
| Repository | Backend Development Labs |

---

## Technologies Used

The following technologies and tools are used throughout the laboratory exercises:

- **Node.js** – JavaScript runtime environment.
- **Express.js** – Backend web application framework.
- **JavaScript** – Server-side programming language.
- **SQLite** – Lightweight relational database.
- **bcrypt** – Password hashing and security.
- **JWT (JSON Web Token)** – User authentication.
- **Postman** – API testing and verification.
- **Git & GitHub** – Version control and project management.
- **Visual Studio Code** – Development environment.

---

## Repository Structure

```text
Backend-Development-Labs/
│
├── lab-01/
│   ├── screenshots/
│   ├── http-server.js
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── lab-02/
│   ├── screenshots/
│   └── README.md
│
├── lab-03/
│   ├── screenshots/
│   └── README.md
│
├── lab-04/
│   ├── routes/
│   │   └── auth.js
│   ├── screenshots/
│   ├── database.js
│   ├── server.js
│   ├── package.json
│   ├── .gitignore
│   └── README.md
│
└── README.md
```

---

## Laboratory Exercises

### Lab 01 – Node.js and Express Server

**Objective:** Understand the fundamentals of Node.js and Express.js by creating HTTP servers and implementing different routes.

**Concepts Covered:**
- Introduction to Node.js.
- Creating an HTTP server.
- Introduction to Express.js.
- Implementing GET routes.
- Handling HTTP requests and responses.
- Managing HTTP status codes.
- Handling unknown routes.

**Implemented Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Welcome message |
| GET | `/about` | Student information |
| GET | `/time` | Current date and time |
| GET | `/contact` | 404 error handling |

---

### Lab 02 – Database Operations

**Objective:** Develop practical knowledge of backend database operations and database integration.

Refer to the individual Lab 02 folder for implementation details, source code and screenshots.

---

### Lab 03 – REST API Development

**Objective:** Implement and test REST API functionality using backend technologies.

**Concepts Covered:**
- REST API fundamentals.
- HTTP methods.
- API endpoints.
- Request and response handling.
- JSON data handling.
- API testing using Postman.

Refer to the Lab 03 folder for the complete implementation and screenshots.

---

### Lab 04 – User Registration, Login and JWT Authentication

**Objective:** Implement secure user registration and login functionality using password hashing and JSON Web Tokens.

**Concepts Covered:**
- User registration.
- User login.
- SQLite database integration.
- Password hashing using bcrypt.
- Password verification.
- JWT generation.
- Authentication error handling.
- API testing using Postman.

**Implemented Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register/` | Register a new user |
| POST | `/login/` | Authenticate a user and generate JWT |

**Security Features:**
- Passwords are stored as hashed values.
- Duplicate usernames are rejected.
- Invalid login credentials are handled.
- JWT tokens are generated after successful authentication.

---

## Installation and Setup

### Prerequisites

Install the following before running the projects:

- Node.js
- npm (Node Package Manager)
- Visual Studio Code
- Postman

### Clone the Repository

```bash
git clone https://github.com/SahithyaKacharla/Backend-Development-Labs.git
```

### Navigate to a Lab

For example, to run Lab 04:

```bash
cd Backend-Development-Labs/lab-04
```

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
npm run dev
```

The server runs locally at:

```text
http://localhost:3000
```

**Note:** Each laboratory exercise has its own dependencies and execution instructions. Refer to its individual README before running it.

---

## API Testing

Postman is used to test and verify backend API functionality.

The test cases include:

- Successful API requests.
- Invalid input handling.
- Missing required fields.
- Duplicate user registration.
- Successful authentication.
- Incorrect password handling.
- Unknown username handling.
- JWT token generation and decoding.

Screenshots of the API responses are maintained in the respective laboratory folders.

---

## Learning Outcomes

Through these laboratory exercises, I gained practical experience in:

1. Understanding Node.js and Express.js.
2. Creating and managing HTTP servers.
3. Implementing backend routes.
4. Understanding REST API architecture.
5. Working with relational databases.
6. Handling HTTP requests and responses.
7. Implementing user authentication.
8. Securing passwords using bcrypt.
9. Generating and understanding JWT tokens.
10. Testing APIs using Postman.
11. Managing projects using Git and GitHub.

---

## Development Tools

| Tool | Purpose |
|---|---|
| Visual Studio Code | Code development |
| Node.js | Server-side execution |
| Postman | API testing |
| SQLite | Database management |
| Git | Version control |
| GitHub | Code hosting and collaboration |

---

## Author

**Sahithya Kacharla**

Computer Science Engineering – AIML

GitHub: https://github.com/SahithyaKacharla

---

## Conclusion

This repository documents my practical learning journey in Backend Development Fundamentals. Each laboratory exercise builds upon backend development concepts, starting with basic HTTP servers and progressing towards database integration, REST API development and secure user authentication.

These exercises helped strengthen my understanding of server-side programming and the development of backend applications using modern technologies.