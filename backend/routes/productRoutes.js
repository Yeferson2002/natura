const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(getProducts).post(upload.array('images', 3), createProduct);
router.route('/:id').get(getProductById).put(upload.array('images', 3), updateProduct).delete(deleteProduct);

module.exports = router;
