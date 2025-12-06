const asyncHandler = require('express-async-handler');
const Recommendation = require('../models/Recommendation');
const Product = require('../models/Product');

// @desc    Create a new recommendation
// @route   POST /api/recommendations
// @access  Private/Consultant
const createRecommendation = asyncHandler(async (req, res) => {
    const { clientId, productId, reason } = req.body;
    const consultantId = req.user.id; // From auth middleware

    const recommendation = await Recommendation.create({
        ClientId: clientId,
        ConsultantId: consultantId,
        ProductId: productId,
        reason: reason,
        status: 'Active'
    });

    res.status(201).json(recommendation);
});

// @desc    Get recommendations for a client
// @route   GET /api/recommendations/client/:clientId
// @access  Private
const getClientRecommendations = asyncHandler(async (req, res) => {
    const { clientId } = req.params;

    const recommendations = await Recommendation.findAll({
        where: {
            ClientId: clientId,
            status: 'Active'
        },
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'price', 'image', 'description', 'brand']
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    res.json(recommendations);
});

// @desc    Get recommendations made by a consultant
// @route   GET /api/recommendations/consultant
// @access  Private/Consultant
const getConsultantRecommendations = asyncHandler(async (req, res) => {
    const consultantId = req.user.id; // From auth middleware

    const recommendations = await Recommendation.findAll({
        where: {
            ConsultantId: consultantId,
            status: 'Active'
        },
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'price', 'image', 'description', 'brand']
            },
            {
                model: require('../models/Client'),
                attributes: ['id', 'firstName', 'lastName']
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    res.json(recommendations);
});

module.exports = {
    createRecommendation,
    getClientRecommendations,
    getConsultantRecommendations
};
