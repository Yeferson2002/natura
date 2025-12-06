const { sequelize } = require('./config/db');
const { Order, OrderItem } = require('./models/Order');
const Product = require('./models/Product');

const seedOrderItems = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        // Get all orders
        const orders = await Order.findAll();
        if (orders.length === 0) {
            console.log('No orders found. Run seed_clients.js first.');
            process.exit(0);
        }

        // Get some products
        const products = await Product.findAll();
        if (products.length === 0) {
            console.log('No products found. Please seed products first.');
            process.exit(0);
        }

        console.log(`Found ${orders.length} orders and ${products.length} products.`);

        for (const order of orders) {
            // Check if order already has items
            const existingItems = await OrderItem.count({ where: { OrderId: order.id } });
            if (existingItems > 0) {
                console.log(`Order ${order.id} already has items. Skipping.`);
                continue;
            }

            // Create 1-3 random items for each order
            const numberOfItems = Math.floor(Math.random() * 3) + 1;

            for (let i = 0; i < numberOfItems; i++) {
                const randomProduct = products[Math.floor(Math.random() * products.length)];

                await OrderItem.create({
                    OrderId: order.id,
                    ProductId: randomProduct.id,
                    name: randomProduct.name,
                    qty: Math.floor(Math.random() * 2) + 1,
                    image: randomProduct.image,
                    price: randomProduct.price
                });
            }
            console.log(`Added ${numberOfItems} items to Order ${order.id}`);
        }

        console.log('Order items seeding completed.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding order items:', error);
        process.exit(1);
    }
};

seedOrderItems();
