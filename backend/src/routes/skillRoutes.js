const express = require('express');
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, skillController.addSkill);
router.get('/', skillController.getAllSkills);
router.get('/user/:userId', skillController.getUserSkills);
router.put('/:id', authMiddleware, skillController.updateSkill);
router.delete('/:id', authMiddleware, skillController.deleteSkill);

module.exports = router;
