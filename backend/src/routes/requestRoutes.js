const express = require('express');
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const optionalAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }

  return authMiddleware(req, res, next);
};

router.post('/', authMiddleware, requestController.createRequest);
router.get('/', optionalAuth, requestController.getRequests);
router.get('/:id', requestController.getRequestById);
router.post('/:id/accept', authMiddleware, requestController.acceptRequest);
router.put('/:id', authMiddleware, requestController.updateRequestStatus);

module.exports = router;
