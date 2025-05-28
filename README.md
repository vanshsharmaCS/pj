# EventSpot - Event Booking System

![EventSpot Banner](https://github.com/user-attachments/assets/358631a9-2978-4257-952a-af1304228169)

A full-featured event booking platform built with Node.js following the MVC architecture pattern. This system allows users to browse events, create accounts, book tickets, and administrators to manage events and bookings.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Management
- Secure user registration and authentication
- JWT-based authorization
- Role-based access control (Admin/User)
- User profile management

### Event Management
- Create, read, update, and delete events (CRUD)
- Rich event details (title, description, date, location, capacity)
- Event image uploads
- Event categorization and tagging

### Booking System
- Seat availability tracking
- Booking confirmation
- Booking history for users
- Booking management for admins

### Advanced Features
- Pagination and filtering for events
- Search functionality
- Responsive design for all devices
- Form validation (client and server-side)
- Comprehensive error handling

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Database
- **Sequelize** - ORM for database interactions
- **JWT** - Authentication mechanism
- **Bcrypt** - Password hashing

### Frontend
- **EJS** - Templating engine
- **CSS3** - Styling
- **JavaScript** - Client-side functionality
- **Responsive Design** - Mobile-first approach

### DevOps & Tools
- **Docker** - Containerization
- **Swagger** - API documentation
- **ESLint** - Code quality
- **Jest** - Testing framework
- **Git** - Version control

## 🏗️ Architecture

This project strictly follows the MVC (Model-View-Controller) architecture:

- **Models**: Define data structures and handle database interactions
- **Views**: EJS templates for rendering the UI
- **Controllers**: Handle request processing and business logic

Additionally, the project implements:
- Service layer for complex business logic
- Middleware for authentication, validation, and error handling
- Repository pattern for data access abstraction

## 📸 Screenshots

### Login & Signup Page
![Login Page](https://github.com/user-attachments/assets/358631a9-2978-4257-952a-af1304228169)

### Dashboard & Features
![Dashboard](https://github.com/user-attachments/assets/fa378f31-62e7-4f48-9152-b8e77e16972f)

### All Features
![Screenshot from 2025-05-28 10-41-17](https://github.com/user-attachments/assets/2837d355-c563-48fe-b879-4e50f8b38602)



## 📚 API Documentation

API documentation is available via Swagger UI at `/api-docs` when the server is running.

### Core Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST   | /api/auth/signup | Register new user | No |
| POST   | /api/auth/login  | Authenticate user | No |
| GET    | /api/events      | List all events   | No |
| GET    | /api/events/:id  | Get event details | No |
| POST   | /api/events      | Create new event  | Yes (Admin) |
| PUT    | /api/events/:id  | Update event      | Yes (Admin) |
| DELETE | /api/events/:id  | Delete event      | Yes (Admin) |
| POST   | /api/bookings/book/:id | Book an event | Yes (User) |
| GET    | /api/bookings    | Get user bookings | Yes (User) |
| GET    | /api/admin/bookings | Get all bookings | Yes (Admin) |

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Standard Setup
```bash
# Clone the repository
git clone https://github.com/vanshsharmaCS/pj.git
cd pj

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the application
npm start

# Access the application at http://localhost:3000
```

### Docker Setup
```bash
# Build and run with Docker
docker-compose up -d

# Access the application at http://localhost:3000
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Database Configuration
DB_PATH=./database.sqlite

# Session Configuration
SESSION_SECRET=your_session_secret_here
```

## 📁 Project Structure

```
event-booking-system/
├── config/             # Configuration files
├── controllers/        # Request handlers
├── middlewares/        # Custom middleware functions
├── models/             # Data models
├── public/             # Static assets
├── routes/             # API routes
├── services/           # Business logic
├── utils/              # Utility functions
├── views/              # EJS templates
├── tests/              # Test files
├── .env                # Environment variables
├── .env.example        # Example environment variables
├── .eslintrc.js        # ESLint configuration
├── .gitignore          # Git ignore file
├── app.js              # Application entry point
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── package.json        # Project dependencies
├── README.md           # Project documentation
└── swagger.js          # API documentation configuration
```

## 💾 Database Schema

### Users
- id (PK)
- username
- email
- password (hashed)
- role (enum: 'admin', 'user')
- createdAt
- updatedAt

### Events
- id (PK)
- title
- description
- dateTime
- location
- totalSeats
- availableSeats
- createdBy (FK to Users)
- createdAt
- updatedAt

### Bookings
- id (PK)
- userId (FK to Users)
- eventId (FK to Events)
- bookingDate
- status (enum: 'confirmed', 'cancelled')
- createdAt
- updatedAt

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --testPathPattern=auth

# Generate test coverage report
npm run test:coverage
```

## 📦 Deployment

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm run start:prod
```

### Deployment Options
- **Docker**: Use the included Dockerfile and docker-compose.yml
- **Heroku**: Compatible with Heroku deployment
- **AWS/GCP/Azure**: Can be deployed to any cloud provider

## 🔮 Future Enhancements

- Email notifications for bookings and reminders
- Payment integration for paid events
- QR code generation for tickets
- Social media sharing
- Event analytics dashboard
- Mobile application

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Developed with ❤️ by [Vansh Sharma](https://github.com/vanshsharmaCS)
