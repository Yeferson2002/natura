const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Client = require('../models/Client');
const bcrypt = require('bcryptjs');

const { Order } = require('../models/Order');
const { Op } = require('sequelize');

// @desc    Get all consultants
// @route   GET /api/users/consultants
// @access  Private/Admin (TODO: Add auth middleware later)
const getConsultants = asyncHandler(async (req, res) => {
    console.log('Fetching consultants...');
    try {
        const consultants = await User.findAll({
            where: { role: 'consultant' },
            attributes: { exclude: ['password'] },
            include: [{
                model: Order,
                as: 'ConsultantOrders',
                attributes: ['totalPrice', 'createdAt'],
                attributes: ['totalPrice', 'createdAt'],
                required: false // Left join
            }, {
                model: Client,
                attributes: ['id'],
                required: false
            }]
        });
        console.log(`Found ${consultants.length} consultants.`);

        // Calculate monthly sales for each consultant
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const consultantsWithSales = consultants.map(consultant => {
            const monthlySales = consultant.ConsultantOrders.reduce((acc, order) => {
                const orderDate = new Date(order.createdAt);
                if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
                    return acc + parseFloat(order.totalPrice);
                }
                return acc;
            }, 0);

            return {
                ...consultant.toJSON(),
                ...consultant.toJSON(),
                monthlySales: monthlySales.toFixed(2),
                clientCount: consultant.Clients ? consultant.Clients.length : 0
            };
        });

        res.json(consultantsWithSales);
    } catch (error) {
        console.error('Error in getConsultants:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a new consultant (Public Registration or Admin)
// @route   POST /api/users/consultants
// @access  Public
const createConsultant = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, dni, phone, consultantLevel, status, monthlySales } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // For public registration, status is always 'Pendiente' and password is a placeholder
    // If created by admin (status provided), use that.
    const userStatus = status || 'Pendiente';

    // Initial password. If Pending, it doesn't matter much as they can't login until approved/password set.
    // But we set a placeholder to satisfy NOT NULL constraint if exists.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dni, salt);

    const user = await User.create({
        firstName,
        lastName,
        email,
        dni,
        phone,
        password: hashedPassword,
        role: 'consultant',
        consultantLevel: consultantLevel || 'Bronce',
        status: userStatus,
        monthlySales: monthlySales || 0
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            status: user.status
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Approve a consultant
// @route   PUT /api/users/:id/approve
// @access  Private/Admin
const approveConsultant = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
        // Generate a random password or use DNI as default
        const generatedPassword = user.dni; // Using DNI for simplicity as requested
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(generatedPassword, salt);
        user.status = 'Activa';

        await user.save();

        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            status: user.status,
            generatedPassword: generatedPassword // Send back so admin can share it
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get consultant by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getConsultantById = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
    });

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update consultant
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateConsultant = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);

    console.log('Update Consultant Request Body:', req.body);
    console.log('Current User Phone in DB:', user ? user.phone : 'User not found');

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.dni = req.body.dni || user.dni;
        user.phone = req.body.phone || user.phone;
        user.consultantLevel = req.body.consultantLevel || user.consultantLevel;
        user.status = req.body.status || user.status;
        user.monthlySales = req.body.monthlySales || user.monthlySales;

        const updatedUser = await user.save();
        console.log('Updated User Phone:', updatedUser.phone);

        res.json({
            _id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role,
            status: updatedUser.status
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    getConsultants,
    createConsultant,
    approveConsultant,
    getConsultantById,
    updateConsultant
};
