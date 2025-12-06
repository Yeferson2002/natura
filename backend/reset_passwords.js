const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '.env') });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
}, {
    hooks: {
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

const resetPassword = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Find ALL users
        const users = await User.findAll();

        if (users.length > 0) {
            console.log(`Found ${users.length} users. Resetting passwords...`);

            for (const user of users) {
                user.password = '123456'; // Reset to known password
                await user.save();
                console.log(`Password updated for: ${user.firstName} ${user.lastName} (${user.email})`);
            }

            console.log('All passwords updated successfully to "123456"');
        } else {
            console.log('No users found');
        }

    } catch (error) {
        console.error('Error updating passwords:', error);
    } finally {
        await sequelize.close();
    }
};

resetPassword();
