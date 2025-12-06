const { connectDB, sequelize } = require('./config/db');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const createTestUsers = async () => {
    try {
        await connectDB();

        // Create Admin
        try {
            await User.create({
                firstName: 'Test',
                lastName: 'Admin',
                dni: '99999999',
                email: 'admin_test@example.com',
                password: 'password123',
                role: 'admin'
            });
            console.log('Test Admin created: admin_test@example.com / 99999999 / password123');
        } catch (error) {
            console.log('Admin might already exist or error:', error.message);
        }

        // Create Consultant
        try {
            await User.create({
                firstName: 'Test',
                lastName: 'Consultant',
                dni: '88888888',
                email: 'consultant_test@example.com',
                password: 'password123',
                role: 'consultant'
            });
            console.log('Test Consultant created: consultant_test@example.com / 88888888 / password123');
        } catch (error) {
            console.log('Consultant might already exist or error:', error.message);
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createTestUsers();
