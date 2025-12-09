const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ConsultantId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // Assuming the table name is 'users'
            key: 'id'
        }
    }
}, {
    hooks: {
        beforeCreate: async (client) => {
            if (client.password) {
                const salt = await bcrypt.genSalt(10);
                client.password = await bcrypt.hash(client.password, salt);
            }
        },
        beforeUpdate: async (client) => {
            if (client.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                client.password = await bcrypt.hash(client.password, salt);
            }
        }
    },
    tableName: 'clients'
});

Client.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = Client;
