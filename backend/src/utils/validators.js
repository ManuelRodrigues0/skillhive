// Validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

const validateUsername = (username) => {
  // Alphanumeric and underscore only, 3-20 characters
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

const validateSkillName = (skillName) => {
  return skillName && skillName.trim().length >= 3;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  validateSkillName,
};
