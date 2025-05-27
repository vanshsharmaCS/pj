# Event Booking System API
## Login & Signup Page
![Screenshot from 2025-05-27 09-03-27](https://github.com/user-attachments/assets/358631a9-2978-4257-952a-af1304228169)

## Features
- User signup/login with JWT
- Role-based access (admin, user)
- Event CRUD
- Booking system

## All feature 
![Screenshot from 2025-05-27 09-04-02](https://github.com/user-attachments/assets/fa378f31-62e7-4f48-9152-b8e77e16972f)

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
