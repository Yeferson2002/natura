const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Client = require('../models/Client');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, dni, password } = req.body;

    let user;
    let isClient = false;

    // 1. Try to find in Users table (Admin/Consultant)
    if (email) {
        user = await User.findOne({ where: { email } });
    } else if (dni) {
        user = await User.findOne({ where: { dni } });
    }

    // 2. If not found in Users, try to find in Clients table
    if (!user) {
        if (email) {
            user = await Client.findOne({ where: { email } });
        }
        // Clients might not have DNI login implemented yet, but if they did:
        // else if (dni) { user = await Client.findOne({ where: { dni } }); }

        if (user) {
            isClient = true;
        }
    }

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: isClient ? 'client' : user.role, // Clients don't have a role column usually, so default to 'client'
            token: generateToken(user.id, isClient ? 'client' : user.role)
        });
    } else {
        res.status(401);
        throw new Error('Credenciales inválidas');
    }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, dni, email, phone, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        firstName,
        lastName,
        dni,
        email,
        phone,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user.id, user.role)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

module.exports = { authUser, registerUser };
