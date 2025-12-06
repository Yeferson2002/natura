const { Sequelize } = require('sequelize');
const Product = require('./models/Product');
const { sequelize } = require('./config/db');
const { Op } = require('sequelize');

async function checkProducts() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const products = await Product.findAll({
            where: {
                category: {
                    [Op.like]: '%Perfumería%'
                }
            }
        });

        console.log(`Found ${products.length} products in Perfumería:`);
        products.forEach(p => {
            console.log(`- ID: ${p.id}, Name: "${p.name}", Price: ${p.price}, Image: "${p.image}"`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

checkProducts();
