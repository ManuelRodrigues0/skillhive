// Response formatting utility
const formatSuccessResponse = (data, message = 'Operation successful') => {
  return {
    success: true,
    message,
    data,
  };
};

const formatErrorResponse = (message = 'Operation failed', error = null) => {
  return {
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error : null,
  };
};

// Date utility
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

module.exports = {
  formatSuccessResponse,
  formatErrorResponse,
  formatDate,
  getTimeAgo,
};
