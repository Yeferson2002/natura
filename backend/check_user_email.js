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

const checkEmail = async () => {
    try {
        await sequelize.authenticate();
        const [results] = await sequelize.query("SELECT * FROM users WHERE email = 'maria@example.com'");
        console.log('Users with email maria@example.com:', results);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
};

checkEmail();
