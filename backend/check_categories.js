const { Sequelize } = require('sequelize');
const Product = require('./models/Product');
const { sequelize } = require('./config/db');

async function checkCategories() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const products = await Product.findAll({
            attributes: ['category'],
            group: ['category']
        });

        console.log('Categories found in database:');
        products.forEach(p => {
            console.log(`- "${p.category}"`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

checkCategories();
