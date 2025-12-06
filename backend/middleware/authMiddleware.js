const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Client = require('../models/Client');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check role to decide which table to query
            if (decoded.role === 'client') {
                req.user = await Client.findByPk(decoded.id, {
                    attributes: { exclude: ['password'] }
                });
                // Add role property to req.user manually since Client model might not have it
                if (req.user) {
                    req.user.role = 'client';
                }
            } else {
                req.user = await User.findByPk(decoded.id, {
                    attributes: { exclude: ['password'] }
                });
            }

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };
