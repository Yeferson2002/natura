const express = require('express');
const router = express.Router();
const { createRecommendation, getClientRecommendations, getConsultantRecommendations } = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createRecommendation);
router.get('/client/:clientId', getClientRecommendations);
router.get('/consultant', protect, getConsultantRecommendations);

module.exports = router;
