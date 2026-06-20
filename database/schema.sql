-- Create Database
CREATE DATABASE IF NOT EXISTS skillhive_db;
USE skillhive_db;

-- Users Table
CREATE TABLE Users (
  id CHAR(36) PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullName VARCHAR(255) NOT NULL,
  profilePhoto VARCHAR(500),
  bio TEXT,
  credits INT DEFAULT 100,
  reputation FLOAT DEFAULT 0,
  totalSessionsCompleted INT DEFAULT 0,
  isVerified BOOLEAN DEFAULT FALSE,
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username)
);

-- Skills Table
CREATE TABLE Skills (
  id CHAR(36) PRIMARY KEY,
  userId CHAR(36) NOT NULL,
  skillName VARCHAR(255) NOT NULL,
  category ENUM('Coding', 'Languages', 'Cooking', 'Education', 'Plantation', 'Sports', 'Repair', 'Art', 'Music', 'Other'),
  description TEXT,
  proficiencyLevel ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Intermediate',
  yearsOfExperience INT DEFAULT 0,
  isTeaching BOOLEAN DEFAULT FALSE,
  isLearning BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  INDEX idx_userId (userId),
  INDEX idx_category (category)
);

-- Skill Requests Table
CREATE TABLE SkillRequests (
  id CHAR(36) PRIMARY KEY,
  learnerId CHAR(36) NOT NULL,
  skillName VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  preferredSchedule VARCHAR(255),
  duration INT DEFAULT 1,
  expectedOutcomes TEXT,
  status ENUM('pending', 'accepted', 'rejected', 'completed', 'cancelled') DEFAULT 'pending',
  mentorId CHAR(36),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (learnerId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (mentorId) REFERENCES Users(id) ON DELETE SET NULL,
  INDEX idx_learnerId (learnerId),
  INDEX idx_status (status)
);

-- Sessions Table
CREATE TABLE Sessions (
  id CHAR(36) PRIMARY KEY,
  skillRequestId CHAR(36) NOT NULL,
  mentorId CHAR(36) NOT NULL,
  learnerId CHAR(36) NOT NULL,
  scheduledTime DATETIME NOT NULL,
  duration INT DEFAULT 60,
  status ENUM('scheduled', 'in-progress', 'completed', 'cancelled', 'missed') DEFAULT 'scheduled',
  notes TEXT,
  feedback TEXT,
  rating FLOAT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (skillRequestId) REFERENCES SkillRequests(id) ON DELETE CASCADE,
  FOREIGN KEY (mentorId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (learnerId) REFERENCES Users(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_mentorId (mentorId),
  INDEX idx_learnerId (learnerId)
);

-- Credit Transactions Table
CREATE TABLE CreditTransactions (
  id CHAR(36) PRIMARY KEY,
  userId CHAR(36) NOT NULL,
  amount INT NOT NULL,
  type ENUM('earned', 'spent', 'transferred', 'penalty'),
  reason VARCHAR(255),
  relatedSessionId CHAR(36),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (relatedSessionId) REFERENCES Sessions(id) ON DELETE SET NULL,
  INDEX idx_userId (userId),
  INDEX idx_type (type)
);

-- Messages Table (for chat)
CREATE TABLE Messages (
  id CHAR(36) PRIMARY KEY,
  senderId CHAR(36) NOT NULL,
  receiverId CHAR(36) NOT NULL,
  content TEXT NOT NULL,
  sessionId CHAR(36),
  isRead BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (senderId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiverId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (sessionId) REFERENCES Sessions(id) ON DELETE SET NULL,
  INDEX idx_senderId (senderId),
  INDEX idx_receiverId (receiverId)
);

-- Achievements Table
CREATE TABLE Achievements (
  id CHAR(36) PRIMARY KEY,
  userId CHAR(36) NOT NULL,
  badgeType VARCHAR(100),
  description TEXT,
  earnedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  INDEX idx_userId (userId)
);
