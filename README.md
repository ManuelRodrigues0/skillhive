# SkillHive Platform - Complete Setup Guide

A credit-based skill exchange platform that enables users to teach and learn skills without monetary transactions.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [Project Structure](#project-structure)
8. [API Endpoints](#api-endpoints)
9. [Database Schema](#database-schema)

## Project Overview

SkillHive is a comprehensive skill exchange platform that connects mentors with learners. Users can:
- Create skill-based profiles
- Post learning requests
- Find and connect with suitable mentors via AI-based matching
- Communicate through integrated chat and video calls
- Earn and spend credits based on teaching/learning activities
- Build reputation and track achievements

## Features

### Core Features
- ✅ Secure user registration and authentication (JWT)
- ✅ Skill-based profile creation with multiple expertise areas
- ✅ AI-based mentor-learner matching algorithm
- ✅ Category-wise skill organization
- ✅ Real-time encrypted chat system (Socket.IO)
- ✅ Live video calling (WebRTC)
- ✅ Session scheduling and tracking
- ✅ Credit-based reward system
- ✅ Penalty mechanism for missed sessions
- ✅ Achievement and reputation system
- ✅ Cross-platform responsive web design

### Technical Features
- Real-time notifications
- Session attendance tracking
- Automated credit management
- User reputation scoring
- Advanced search and filtering

## Technology Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **WebRTC** - Video calling
- **CSS3** - Styling

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time chat
- **Sequelize** - ORM
- **JWT** - Authentication
- **bcrypt** - Password encryption

### Database
- **MySQL** - Structured data storage

### Security
- **HTTPS** - Secure communication
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin protection

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL (Community Edition)
- Git

### Step 1: Clone the Repository
```bash
cd d:\swaphub
```

### Step 2: Setup Database
1. Open MySQL and run the schema:
```bash
mysql -u root -p < database/schema.sql
```

2. Create a `.env` file in the backend directory:
```bash
cd backend
copy .env.example .env
```

Edit `.env` with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=skillhive_db
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Step 3: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 4: Install Frontend Dependencies
```bash
cd frontend
npm install
```

## Configuration

### Backend Configuration
Edit `backend/.env`:
- Database connection details
- JWT secret key
- Server port (default: 5000)
- Frontend URL for CORS

### Frontend Configuration
Create `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

### Terminal 2 - Frontend Server
```bash
cd frontend
npm start
```
Frontend runs on `http://localhost:3000`

## Project Structure

```
skillhive/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── jwt.js
│   │   ├── controllers/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Skill.js
│   │   │   ├── SkillRequest.js
│   │   │   ├── Session.js
│   │   │   └── CreditTransaction.js
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
│
├── database/
│   └── schema.sql
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/credits` - Get user credits

### Skills
- `POST /api/skills` - Add new skill
- `GET /api/skills` - Get all skills
- `GET /api/skills/user/:userId` - Get user's skills
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Skill Requests
- `POST /api/requests` - Create skill request
- `GET /api/requests` - Get all requests
- `GET /api/requests/:id` - Get request details
- `POST /api/requests/:id/accept` - Accept request
- `PUT /api/requests/:id` - Update request status

### Sessions
- `POST /api/sessions` - Create session
- `GET /api/sessions` - Get sessions
- `PUT /api/sessions/:id` - Update session
- `POST /api/sessions/:id/rate` - Rate session

### Credits
- `GET /api/credits/:userId/transactions` - Get credit history
- `POST /api/credits/transfer` - Transfer credits

## Database Schema

The application uses the following main tables:

- **Users** - User accounts and profiles
- **Skills** - User skills and expertise
- **SkillRequests** - Learning requests from users
- **Sessions** - Scheduled learning sessions
- **CreditTransactions** - Credit movement history
- **Messages** - Chat messages between users
- **Achievements** - User badges and accomplishments

See `database/schema.sql` for complete schema details.

## Credit System

### Initial Credits
- New users start with **100 credits**

### Credit Transactions
- **2 credits** deducted per session (learner)
- **10 credits** awarded to mentor upon completion
- **Credit penalty** for missed sessions
- **Credits transferred** for session extensions

## Getting Started Development

1. Install dependencies for both frontend and backend
2. Set up MySQL database with provided schema
3. Configure environment variables
4. Run backend server
5. Run frontend server
6. Visit `http://localhost:3000`

## Support

For issues or questions, please refer to the project documentation or contact the development team.

## License

MIT License - See LICENSE file for details
