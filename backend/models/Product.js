const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    originalPrice: {
        type: DataTypes.DECIMAL(10, 2)
    },
    discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image3: {
        type: DataTypes.STRING,
        allowNull: true
    },

    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('Disponible', 'Agotado'),
        defaultValue: 'Disponible'
    }
}, {
    tableName: 'products'
});

const Category = require('./Category');

Product.belongsTo(Category, { foreignKey: 'CategoryId' });
Category.hasMany(Product, { foreignKey: 'CategoryId' });

module.exports = Product;
