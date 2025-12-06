const { sequelize } = require('./config/db');

const truncateOrderItems = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        await sequelize.query('TRUNCATE TABLE OrderItems');
        console.log('OrderItems table truncated.');

        process.exit(0);
    } catch (error) {
        console.error('Error truncating table:', error);
        process.exit(1);
    }
};

truncateOrderItems();
