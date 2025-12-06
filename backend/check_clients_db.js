const { connectDB } = require('./config/db');
const Client = require('./models/Client');
const User = require('./models/User');

const checkClients = async () => {
    await connectDB();

    // Define associations for this script
    Client.belongsTo(User, { as: 'Consultant', foreignKey: 'ConsultantId' });
    User.hasMany(Client, { foreignKey: 'ConsultantId' });

    try {
        const count = await Client.count();
        console.log(`Total Clients in DB: ${count}`);

        const clients = await Client.findAll({
            include: [{
                model: User,
                as: 'Consultant',
                attributes: ['id', 'firstName', 'lastName']
            }]
        });

        console.log('Clients found:', JSON.stringify(clients, null, 2));
    } catch (error) {
        console.error('Error fetching clients:', error);
    }

    process.exit();
};

checkClients();
