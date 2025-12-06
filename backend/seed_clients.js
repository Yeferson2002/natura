const { sequelize } = require('./config/db');
const Client = require('./models/Client');
const { Order } = require('./models/Order');
const User = require('./models/User');

const seedClients = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        // 1. Create 5 Clients
        const clientsData = [
            { firstName: 'María', lastName: 'González', email: 'maria@example.com', phone: '999111222', password: 'password123' },
            { firstName: 'Ana', lastName: 'Pérez', email: 'ana@example.com', phone: '999333444', password: 'password123' },
            { firstName: 'Lucía', lastName: 'Rodríguez', email: 'lucia@example.com', phone: '999555666', password: 'password123' },
            { firstName: 'Carmen', lastName: 'Sánchez', email: 'carmen@example.com', phone: '999777888', password: 'password123' },
            { firstName: 'Patricia', lastName: 'Lima', email: 'patricia@example.com', phone: '999999000', password: 'password123' }
        ];

        const createdClients = [];
        for (const data of clientsData) {
            // Check if exists
            let client = await Client.findOne({ where: { email: data.email } });
            if (!client) {
                client = await Client.create(data);
                console.log(`Created client: ${client.firstName} ${client.lastName}`);
            } else {
                console.log(`Client already exists: ${client.firstName} ${client.lastName}`);
            }
            createdClients.push(client);
        }

        // 2. Create Orders for these clients
        // We need a consultant ID. Let's use the first consultant found.
        const consultant = await User.findOne({ where: { role: 'consultant' } });
        const consultantId = consultant ? consultant.id : null;

        if (!consultantId) {
            console.log('No consultant found. Orders will have null ConsultantId.');
        }

        const ordersData = [
            {
                ClientId: createdClients[0].id,
                ConsultantId: consultantId,
                totalPrice: 450.00,
                status: 'Completado',
                paymentMethod: 'Tarjeta de Crédito',
                shippingAddress: { address: 'Av. Larco 123, Lima' },
                itemsPrice: 400.00, taxPrice: 50.00, shippingPrice: 0.00, isPaid: true, isDelivered: true
            },
            {
                ClientId: createdClients[1].id,
                ConsultantId: consultantId,
                totalPrice: 280.50,
                status: 'Pendiente',
                paymentMethod: 'Yape',
                shippingAddress: { address: 'Jr. Union 456, Lima' },
                itemsPrice: 250.00, taxPrice: 30.50, shippingPrice: 0.00, isPaid: false, isDelivered: false
            },
            {
                ClientId: createdClients[2].id,
                ConsultantId: consultantId,
                totalPrice: 890.00,
                status: 'En Proceso',
                paymentMethod: 'Transferencia',
                shippingAddress: { address: 'Av. Arequipa 789, Lima' },
                itemsPrice: 800.00, taxPrice: 90.00, shippingPrice: 0.00, isPaid: true, isDelivered: false
            },
            {
                ClientId: createdClients[3].id,
                ConsultantId: consultantId,
                totalPrice: 125.00,
                status: 'Completado',
                paymentMethod: 'Efectivo',
                shippingAddress: { address: 'Calle Los Pinos 321, Lima' },
                itemsPrice: 100.00, taxPrice: 15.00, shippingPrice: 10.00, isPaid: true, isDelivered: true
            },
            {
                ClientId: createdClients[4].id,
                ConsultantId: consultantId,
                totalPrice: 340.00,
                status: 'Cancelado',
                paymentMethod: 'Tarjeta de Débito',
                shippingAddress: { address: 'Av. Javier Prado 555, Lima' },
                itemsPrice: 300.00, taxPrice: 40.00, shippingPrice: 0.00, isPaid: false, isDelivered: false
            }
        ];

        for (const orderData of ordersData) {
            await Order.create(orderData);
        }
        console.log(`Created ${ordersData.length} orders linked to clients.`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedClients();
