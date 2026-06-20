// Socket service for managing real-time communication
class SocketService {
  constructor(io) {
    this.io = io;
    this.userSockets = new Map(); // userId -> socketId mapping
  }

  // Register user socket connection
  registerUser(userId, socketId) {
    this.userSockets.set(userId, socketId);
  }

  // Unregister user socket connection
  unregisterUser(userId) {
    this.userSockets.delete(userId);
  }

  // Get socket ID for a user
  getUserSocket(userId) {
    return this.userSockets.get(userId);
  }

  // Send message to specific user
  sendMessageToUser(userId, eventName, data) {
    const socketId = this.getUserSocket(userId);
    if (socketId) {
      this.io.to(socketId).emit(eventName, data);
    }
  }

  // Broadcast to all connected users
  broadcastToAll(eventName, data) {
    this.io.emit(eventName, data);
  }

  // Send notification to user
  notifyUser(userId, notification) {
    this.sendMessageToUser(userId, 'notification', notification);
  }

  // Handle chat between two users
  sendChatMessage(fromUserId, toUserId, message) {
    this.sendMessageToUser(toUserId, 'new_message', {
      from: fromUserId,
      message,
      timestamp: new Date(),
    });
  }
}

module.exports = SocketService;
