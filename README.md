# Event Booking System API

## Features
- User signup/login with JWT
- Role-based access (admin, user)
- Event CRUD
- Booking system

## Setup Instructions
1. Clone the repo
2. `npm install`
3. Add `.env`
4. Run: `npm start`

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/signup | Register user |
| POST   | /api/auth/login  | Login user |
| GET    | /api/events      | Public event list |
| POST   | /api/events      | Admin create event |
| POST   | /api/bookings/book/:id | User books event |

## Sample .env
