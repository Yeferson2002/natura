const { sequelize } = require('./config/db');
const { DataTypes } = require('sequelize');
const User = require('./models/User');

const verifyConsultants = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        const queryInterface = sequelize.getQueryInterface();
        const tableInfo = await queryInterface.describeTable('Users');

        if (!tableInfo.status) {
            console.log('Adding status column...');
            await queryInterface.addColumn('Users', 'status', {
                type: DataTypes.ENUM('Activa', 'Inactiva', 'Pendiente'),
                defaultValue: 'Activa'
            });
        }

        if (!tableInfo.monthlySales) {
            console.log('Adding monthlySales column...');
            await queryInterface.addColumn('Users', 'monthlySales', {
                type: 'DECIMAL(10, 2)',
                defaultValue: 0.00
            });
        }

        // Insert Consultants
        const consultantsData = [
            { firstName: 'María', lastName: 'González', dni: '40123456', email: 'maria.gonzalez@email.com', password: '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', role: 'consultant', consultantLevel: 'Oro', status: 'Activa', monthlySales: 4500.00 },
            { firstName: 'Ana', lastName: 'Pérez', dni: '40654321', email: 'ana.perez@email.com', password: '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', role: 'consultant', consultantLevel: 'Plata', status: 'Activa', monthlySales: 2100.00 },
            { firstName: 'Lucía', lastName: 'Rodríguez', dni: '40987654', email: 'lucia.rodriguez@email.com', password: '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', role: 'consultant', consultantLevel: 'Bronce', status: 'Inactiva', monthlySales: 850.00 },
            { firstName: 'Carmen', lastName: 'Sánchez', dni: '40567890', email: 'carmen.sanchez@email.com', password: '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', role: 'consultant', consultantLevel: 'Diamante', status: 'Activa', monthlySales: 12300.00 },
            { firstName: 'Patricia', lastName: 'Lima', dni: '40432109', email: 'patricia.lima@email.com', password: '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', role: 'consultant', consultantLevel: 'Plata', status: 'Pendiente', monthlySales: 1800.00 }
        ];

        for (const data of consultantsData) {
            const exists = await User.findOne({ where: { email: data.email } });
            if (!exists) {
                await User.create(data);
                console.log(`Created user: ${data.firstName} ${data.lastName}`);
            } else {
                // Update existing user to match the requested data
                await exists.update(data);
                console.log(`Updated user: ${data.firstName} ${data.lastName}`);
            }
        }

        const consultants = await User.findAll({
            where: { role: 'consultant' },
            attributes: ['firstName', 'lastName', 'consultantLevel', 'status', 'monthlySales']
        });

        console.log('Consultants found:', consultants.length);
        consultants.forEach(c => {
            console.log(`${c.firstName} ${c.lastName} - ${c.consultantLevel} - ${c.status} - S/ ${c.monthlySales}`);
        });

        process.exit();
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
};

verifyConsultants();
