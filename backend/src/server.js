const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
const requestRoutes = require('./routes/requestRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
  });
}

// Health Check Routes
app.get('/', (req, res) => {
  res.json({ message: 'SkillHive API Server is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/sessions', sessionRoutes);

// Error handling middleware
app.use(errorHandler);

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);
  socket.data.userId = null;

  socket.on('register_user', (userId) => {
    if (!userId) return;
    socket.data.userId = userId;
    socket.join(`user:${userId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on('send_private_message', (data) => {
    const payload = {
      fromUserId: socket.data.userId,
      toUserId: data.toUserId,
      requestId: data.requestId,
      message: data.message,
      timestamp: new Date().toISOString(),
    };

    io.to(`user:${data.toUserId}`).emit('receive_private_message', payload);
    socket.emit('receive_private_message', payload);
  });

  socket.on('call_user', (data) => {
    io.to(`user:${data.toUserId}`).emit('receive_call', {
      ...data,
      fromUserId: socket.data.userId,
    });
  });

  socket.on('accept_call', (data) => {
    console.log('Call accepted:', data);
    io.emit('call_accepted', data);
  });

  socket.on('end_call', (data) => {
    console.log('Call ended:', data);
    io.emit('call_ended', data);
  });
});

const PORT = process.env.PORT || 5000;
const sequelize = require('./config/database'); // Import sequelize instance

// Import models to ensure they are defined before sync
require('./models/User');
require('./models/Skill');
require('./models/SkillRequest');
require('./models/Session');
require('./models/CreditTransaction');

sequelize.sync({ force: false })
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('Database synchronized');
    }
    // Start server only if not in test environment
    if (process.env.NODE_ENV !== 'test') {
      server.listen(PORT, () => {
        console.log(`SkillHive API Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    }
  })
  .catch(err => {
    console.error('Failed to synchronize database:', err);
  });

module.exports = { app, server, io };
