const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ConsultantId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    ClientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Clients',
            key: 'id'
        }
    },
    shippingAddress: {
        type: DataTypes.JSON, // Storing address as JSON for simplicity
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentResult: {
        type: DataTypes.JSON
    },
    itemsPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    taxPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    shippingPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    paidAt: {
        type: DataTypes.DATE
    },
    isDelivered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deliveredAt: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM('Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'),
        defaultValue: 'Pendiente'
    }
}, {
    tableName: 'orders'
});

// Order Items will be a separate table related to Order
const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    qty: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    OrderId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Orders',
            key: 'id'
        }
    },
    ProductId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'id'
        }
    }
}, {
    tableName: 'orderitems'
});

module.exports = { Order, OrderItem };
