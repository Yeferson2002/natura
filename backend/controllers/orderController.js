const asyncHandler = require('express-async-handler');
const { Order, OrderItem } = require('../models/Order');
const Client = require('../models/Client');
const User = require('../models/User');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        // Determine user type and ID
        let userId = null;
        let clientId = null;
        let consultantId = null;

        console.log('Order Creation Debug:');
        console.log('req.user:', JSON.stringify(req.user, null, 2));
        console.log('req.user.role:', req.user?.role);

        // req.user is populated by authMiddleware
        if (req.user && req.user.role === 'client') {
            console.log('User identified as Client');

            // Verify if it's a valid client and get consultant info
            const client = await Client.findByPk(req.user.id);
            if (client) {
                console.log('Client record found:', client.id);
                clientId = client.id;
                consultantId = client.ConsultantId; // Auto-assign consultant
                userId = null; // Explicitly ensure UserId is null for clients
            } else {
                console.log('Client record NOT found for ID:', req.user.id);
            }
        } else {
            console.log('User identified as Admin/Consultant');
            userId = req.user.id;
            clientId = null; // Explicitly ensure ClientId is null for users
        }

        console.log('Creating Order with:', { UserId: userId, ClientId: clientId, ConsultantId: consultantId });

        const order = await Order.create({
            UserId: userId,
            ClientId: clientId,
            ConsultantId: consultantId,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: true, // For MVP, assume paid immediately
            paidAt: Date.now(),
            status: 'Pendiente'
        });

        // Create Order Items
        for (const item of orderItems) {
            await OrderItem.create({
                name: item.name,
                qty: item.quantity, // Frontend sends 'quantity', DB expects 'qty'
                image: item.image || (item.images && item.images[0]),
                price: item.price,
                ProductId: item.id,
                OrderId: order.id
            });
        }

        res.status(201).json(order);
    }
});



// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.findAll({
        include: [
            {
                model: User,
                as: 'User',
                attributes: ['id', 'firstName', 'lastName', 'email']
            },
            {
                model: Client,
                as: 'Client',
                attributes: ['id', 'firstName', 'lastName', 'email']
            },
            {
                model: User,
                as: 'Consultant',
                attributes: ['id', 'firstName', 'lastName', 'email']
            },
            {
                model: OrderItem,
                as: 'OrderItems'
            }
        ],
        order: [['createdAt', 'DESC']]
    });
    res.json(orders);
});

// @desc    Get orders by client ID
// @route   GET /api/orders/client/:id
// @access  Private/Consultant/Admin
const getOrdersByClient = asyncHandler(async (req, res) => {
    const orders = await Order.findAll({
        where: { ClientId: req.params.id },
        include: [
            {
                model: OrderItem,
                as: 'OrderItems'
            }
        ],
        order: [['createdAt', 'DESC']]
    });
    res.json(orders);
});

// @desc    Get logged in consultant orders (what they bought)
// @route   GET /api/orders/myorders
// @access  Private/Consultant
const getConsultantOrders = asyncHandler(async (req, res) => {
    const orders = await Order.findAll({
        where: { UserId: req.user.id },
        include: [
            {
                model: OrderItem,
                as: 'OrderItems'
            }
        ],
        order: [['createdAt', 'DESC']]
    });
    res.json(orders);
});

module.exports = {
    addOrderItems,
    getOrders,
    getOrdersByClient,
    getConsultantOrders,
};
