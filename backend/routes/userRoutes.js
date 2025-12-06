const express = require('express');
const router = express.Router();
const { getConsultants, createConsultant, approveConsultant, getConsultantById, updateConsultant } = require('../controllers/userController');

router.route('/consultants').get(getConsultants).post(createConsultant);
router.route('/:id/approve').put(approveConsultant);
router.route('/:id').get(getConsultantById).put(updateConsultant);

module.exports = router;
