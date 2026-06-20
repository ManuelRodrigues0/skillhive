const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', userController.getUserProfile);
router.put('/:id', authMiddleware, userController.updateProfile);
router.get('/:id/credits', authMiddleware, userController.getCredits);

module.exports = router;
