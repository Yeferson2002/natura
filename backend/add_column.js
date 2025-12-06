const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log
});

const addColumn = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        await sequelize.query("ALTER TABLE Recommendations ADD COLUMN reason TEXT;");
        console.log('Column reason added successfully.');
    } catch (error) {
        if (error.original && error.original.code === 'ER_DUP_FIELDNAME') {
            console.log('Column reason already exists.');
        } else {
            console.error('Error adding column:', error);
        }
    } finally {
        await sequelize.close();
    }
};

addColumn();
