const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const Category = require('../models/Category');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.findAll({
        include: Category
    });
    // Add virtual images array for frontend compatibility
    const productsWithImages = products.map(product => {
        const productJSON = product.toJSON();
        productJSON.images = [product.image, product.image2, product.image3].filter(Boolean);
        return productJSON;
    });
    res.json(productsWithImages);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (product) {
        const productJSON = product.toJSON();
        productJSON.images = [product.image, product.image2, product.image3].filter(Boolean);
        res.json(productJSON);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, brand, CategoryId, price, originalPrice, discount, stock, description, image, image2, image3, status } = req.body;

    let imagePath = image;
    let imagesPaths = [];

    // Handle multiple file uploads
    if (req.files && req.files.length > 0) {
        imagesPaths = req.files.map(file => `/uploads/${file.filename}`);
    }
    // Handle single file upload (fallback if frontend sends single)
    else if (req.file) {
        imagesPaths = [`/uploads/${req.file.filename}`];
    }
    // Handle URL input
    else {
        // If no files, use the URLs provided in body
    }

    // Assign to columns
    const img1 = (imagesPaths.length > 0 ? imagesPaths[0] : image) || '';
    const img2 = (imagesPaths.length > 0 ? imagesPaths[1] : image2) || null;
    const img3 = (imagesPaths.length > 0 ? imagesPaths[2] : image3) || null;

    const product = await Product.create({
        name,
        brand,
        CategoryId,
        price,
        originalPrice,
        discount,
        stock,
        description,
        image: img1,
        image2: img2,
        image3: img3,
        status: status || 'Disponible'
    });

    if (product) {
        res.status(201).json(product);
    } else {
        res.status(400);
        throw new Error('Invalid product data');
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, brand, CategoryId, price, originalPrice, discount, stock, description, image, image2, image3, status } = req.body;

    const product = await Product.findByPk(req.params.id);

    if (product) {
        let imagePath = product.image;
        let image2Path = product.image2;
        let image3Path = product.image3;

        let imagesPaths = [];

        // Handle multiple file uploads
        if (req.files && req.files.length > 0) {
            imagesPaths = req.files.map(file => `/uploads/${file.filename}`);
            // If files are uploaded, they replace existing images in order
            if (imagesPaths[0]) imagePath = imagesPaths[0];
            if (imagesPaths[1]) image2Path = imagesPaths[1];
            if (imagesPaths[2]) image3Path = imagesPaths[2];
        }
        // Handle single file upload
        else if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }
        // Handle URL input (only if explicitly provided and different/new)
        else {
            if (image !== undefined) imagePath = image;
            if (image2 !== undefined) image2Path = image2;
            if (image3 !== undefined) image3Path = image3;
        }

        product.name = name || product.name;
        product.brand = brand || product.brand;
        product.CategoryId = CategoryId || product.CategoryId;
        product.price = price || product.price;
        product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
        product.discount = discount !== undefined ? discount : product.discount;
        product.stock = stock || product.stock;
        product.description = description || product.description;
        product.image = imagePath;
        product.image2 = image2Path;
        product.image3 = image3Path;
        product.status = status || product.status;

        const updatedProduct = await product.save();

        const productJSON = updatedProduct.toJSON();
        productJSON.images = [updatedProduct.image, updatedProduct.image2, updatedProduct.image3].filter(Boolean);

        res.json(productJSON);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (product) {
        await product.destroy();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
