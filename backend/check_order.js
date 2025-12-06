const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'aba_platform',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

const checkLastOrder = async () => {
    try {
        await sequelize.authenticate();
        const [results] = await sequelize.query("SELECT * FROM orders ORDER BY id DESC LIMIT 1");
        console.log('Last Order:', results[0]);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
};

checkLastOrder();
