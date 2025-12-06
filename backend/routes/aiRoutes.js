const express = require('express');
const router = express.Router();
const { chatWithClientPlan } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/chat', protect, chatWithClientPlan);

module.exports = router;
