const { sequelize } = require('./config/db');
const { Order } = require('./models/Order');

const checkOrders = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        const count = await Order.count();
        console.log(`Total Orders found: ${count}`);

        if (count > 0) {
            const orders = await Order.findAll({ limit: 5 });
            console.log('Sample orders:', JSON.stringify(orders, null, 2));
        }

        process.exit(0);
    } catch (error) {
        console.error('Error checking orders:', error);
        process.exit(1);
    }
};

checkOrders();
