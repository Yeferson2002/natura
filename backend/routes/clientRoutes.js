const express = require('express');
const router = express.Router();
const { getClients, updateClientConsultant } = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getClients);
router.route('/:id/consultant').put(protect, updateClientConsultant);

module.exports = router;
