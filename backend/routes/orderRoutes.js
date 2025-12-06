const express = require('express');
const router = express.Router();
const { addOrderItems, getOrders, getOrdersByClient, getConsultantOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems).get(protect, getOrders);
router.get('/myorders', protect, getConsultantOrders);
router.route('/client/:id').get(protect, getOrdersByClient);

module.exports = router;
