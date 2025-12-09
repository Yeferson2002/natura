const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Recommendation = sequelize.define('Recommendation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM('Active', 'Clicked', 'Dismissed'),
        defaultValue: 'Active'
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Clients',
            key: 'id'
        }
    },
    ConsultantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    }
}, {
    tableName: 'recommendations'
});

module.exports = Recommendation;
