# SkillHive Platform - Development Guide

## Project Overview
SkillHive is a credit-based skill exchange platform that enables users to teach and learn skills without monetary transactions.

## Quick Start

### 1. Prerequisites
- Node.js (v14+)
- MySQL Community Edition
- Git

### 2. Database Setup
```bash
# Create database
mysql -u root -p < database/schema.sql
```

### 3. Backend Setup
```bash
cd backend

# Copy environment variables
copy .env.example .env

# Edit .env with your database credentials
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=skillhive_db

# Install dependencies
npm install

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

### 4. Frontend Setup
```bash
cd frontend

# Copy environment variables
copy .env.example .env

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs on `http://localhost:3000`

## Project Structure

```
skillhive/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── config/             # Database and JWT config
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # Database models
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Express middleware
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Helper functions
│   │   └── server.js           # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # React.js client
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── context/            # React context
│   │   ├── styles/             # CSS modules
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
├── database/
│   └── schema.sql              # MySQL schema
│
└── README.md
```

## Key Features

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes with middleware

### Real-time Features
- Socket.IO for chat messaging
- WebRTC for video calling
- Instant notifications

### Database Models
- **Users** - User accounts and profiles
- **Skills** - User expertise areas
- **SkillRequests** - Learning requests
- **Sessions** - Scheduled learning sessions
- **CreditTransactions** - Credit history
- **Messages** - Chat messages
- **Achievements** - User badges

### Credit System
- Initial credits: 100
- Session cost: 2 credits (learner)
- Mentor reward: 10 credits per completion
- Missed session penalty: 5 credits

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:id` - Get profile
- `PUT /api/users/:id` - Update profile
- `GET /api/users/:id/credits` - Get credits

### Skills
- `POST /api/skills` - Add skill
- `GET /api/skills` - Get all skills
- `GET /api/skills/user/:userId` - Get user skills
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Skill Requests
- `POST /api/requests` - Create request
- `GET /api/requests` - Get requests
- `POST /api/requests/:id/accept` - Accept request

### Sessions
- `POST /api/sessions` - Create session
- `GET /api/sessions` - Get sessions
- `PUT /api/sessions/:id` - Update session

## Development Tips

### Environment Variables
Always copy `.env.example` to `.env` and update values:
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

### Running Both Servers
Open two terminals:

Terminal 1:
```bash
cd backend && npm run dev
```

Terminal 2:
```bash
cd frontend && npm start
```

### Database Migrations
The schema is in `database/schema.sql`. To reset:
```bash
mysql -u root -p skillhive_db < database/schema.sql
```

## Debugging

### Backend Logs
Enable detailed logging:
```bash
# In backend/.env
NODE_ENV=development
```

### Frontend Console
Open DevTools in browser (F12) to see console logs and network requests

### Database Connection
Test MySQL connection:
```bash
mysql -u root -p -e "SELECT 1"
```

## Next Steps

1. ✅ Project structure created
2. ✅ Database schema defined
3. ✅ Backend API configured
4. ✅ Frontend setup completed
5. **TODO**: Implement additional controllers
6. **TODO**: Build UI components
7. **TODO**: Implement video calling
8. **TODO**: Add real-time chat
9. **TODO**: Deploy to production

## Contributing

- Follow the existing code structure
- Use meaningful variable and function names
- Add comments for complex logic
- Test API endpoints before committing
