const { connectDB, sequelize } = require('./config/db');
const User = require('./models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const updateDefaultUsers = async () => {
    try {
        await connectDB();

        const usersToUpdate = [
            { email: 'admin@example.com', newPassword: '123456' },
            { email: 'consultora@example.com', newPassword: '123456' },
            { email: 'cliente@example.com', newPassword: '123456' }
        ];

        for (const u of usersToUpdate) {
            const user = await User.findOne({ where: { email: u.email } });
            if (user) {
                // Manually hash because hooks might not trigger on direct update depending on implementation, 
                // but User model has hooks. Let's try updating the property and saving.
                user.password = u.newPassword;
                await user.save();
                console.log(`Updated password for ${u.email} to '123456'`);
            } else {
                console.log(`User ${u.email} not found`);
            }
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateDefaultUsers();
