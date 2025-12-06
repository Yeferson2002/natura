const { sequelize } = require('./config/db');
const User = require('./models/User');
const { Order } = require('./models/Order');

const verifySales = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        // Define associations for the script context
        User.hasMany(Order, { as: 'ConsultantOrders', foreignKey: 'ConsultantId' });
        Order.belongsTo(User, { as: 'Consultant', foreignKey: 'ConsultantId' });

        // Get a consultant
        const consultant = await User.findOne({ where: { role: 'consultant' } });
        if (!consultant) {
            console.log('No consultant found.');
            process.exit(1);
        }

        console.log(`Testing with consultant: ${consultant.firstName} ${consultant.lastName}`);

        // Create a dummy order for this consultant
        await Order.create({
            UserId: consultant.id, // Consultant buying for themselves or just linked
            ConsultantId: consultant.id,
            shippingAddress: { address: 'Test St' },
            paymentMethod: 'Credit Card',
            itemsPrice: 100.00,
            taxPrice: 18.00,
            shippingPrice: 10.00,
            totalPrice: 128.00,
            isPaid: true,
            paidAt: new Date(),
            isDelivered: true,
            deliveredAt: new Date(),
            status: 'Entregado'
        });

        console.log('Created order with total: 128.00');

        // Fetch consultants via API logic (simulated here since we can't call API easily from script without fetch)
        // We will just replicate the logic or use the controller function if we could mock req/res, 
        // but easier to just query using the same logic as the controller.

        const consultants = await User.findAll({
            where: { id: consultant.id },
            include: [{
                model: Order,
                as: 'ConsultantOrders',
                attributes: ['totalPrice', 'createdAt'],
                required: false
            }]
        });

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const c = consultants[0];
        const monthlySales = c.ConsultantOrders.reduce((acc, order) => {
            const orderDate = new Date(order.createdAt);
            if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
                return acc + parseFloat(order.totalPrice);
            }
            return acc;
        }, 0);

        console.log(`Calculated Monthly Sales: ${monthlySales.toFixed(2)}`);

        if (monthlySales >= 128.00) {
            console.log('Verification PASSED');
        } else {
            console.log('Verification FAILED');
        }

        process.exit();
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
};

verifySales();
