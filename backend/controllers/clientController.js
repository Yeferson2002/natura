const asyncHandler = require('express-async-handler');
const Client = require('../models/Client');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private/Admin
const getClients = asyncHandler(async (req, res) => {
    let whereClause = {};

    // Access role safely (handle Sequelize instance or plain object)
    const role = req.user.role || (req.user.dataValues && req.user.dataValues.role);
    const userId = req.user.id || (req.user.dataValues && req.user.dataValues.id);

    const logMessage = `${new Date().toISOString()} - User requesting clients: ID=${userId}, Role=${role}\n`;
    try {
        fs.appendFileSync(path.join(__dirname, '../backend_debug.log'), logMessage);
    } catch (err) {
        console.error('Error writing to log file:', err);
    }

    console.log('User requesting clients:', userId, role);

    // If user is NOT admin, filter by ConsultantId
    // This ensures consultants (and potentially others) only see their own clients
    if (role !== 'admin') {
        // Ensure userId is valid, otherwise force a filter that returns nothing (or handle appropriate error)
        if (!userId) {
            try {
                fs.appendFileSync(path.join(__dirname, '../backend_debug.log'), 'UserId is missing, returning empty list\n');
            } catch (err) { }
            return res.json([]);
        }
        whereClause = { ConsultantId: userId };
    }

    try {
        const logClause = `${new Date().toISOString()} - Where clause: ${JSON.stringify(whereClause)}\n`;
        fs.appendFileSync(path.join(__dirname, '../backend_debug.log'), logClause);
    } catch (err) { }

    const clients = await Client.findAll({
        where: whereClause,
        include: [{
            model: User,
            as: 'Consultant',
            attributes: ['id', 'firstName', 'lastName', 'email']
        }],
        order: [['createdAt', 'DESC']]
    });
    res.json(clients);
});

// @desc    Update client's consultant
// @route   PUT /api/clients/:id/consultant
// @access  Private/Admin
const updateClientConsultant = asyncHandler(async (req, res) => {
    const { consultantId } = req.body;
    const client = await Client.findByPk(req.params.id);

    if (client) {
        client.ConsultantId = consultantId || null;
        await client.save();

        // Fetch updated client with consultant info
        const updatedClient = await Client.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'Consultant',
                attributes: ['id', 'firstName', 'lastName', 'email']
            }]
        });

        res.json(updatedClient);
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
});

module.exports = {
    getClients,
    updateClientConsultant
};
