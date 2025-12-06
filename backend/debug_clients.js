const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

const Client = sequelize.define('Client', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    ConsultantId: { type: DataTypes.INTEGER }
});

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING }
});

const debug = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const consultant = await User.findByPk(2);
        console.log('Consultant (ID 2):', consultant ? consultant.toJSON() : 'Not found');

        const clients = await Client.findAll();
        console.log('All Clients:', clients.map(c => ({
            id: c.id,
            name: `${c.firstName} ${c.lastName}`,
            ConsultantId: c.ConsultantId
        })));

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
};

debug();
