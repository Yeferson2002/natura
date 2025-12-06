const { sequelize } = require('./config/db');
const { DataTypes } = require('sequelize');

const updateOrderSchema = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        const queryInterface = sequelize.getQueryInterface();
        const tableInfo = await queryInterface.describeTable('Orders');

        if (!tableInfo.ConsultantId) {
            console.log('Adding ConsultantId column to Orders table...');
            await queryInterface.addColumn('Orders', 'ConsultantId', {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onDelete: 'SET NULL'
            });
            console.log('Column added.');
        } else {
            console.log('ConsultantId column already exists.');
        }

        process.exit();
    } catch (error) {
        console.error('Schema update failed:', error);
        process.exit(1);
    }
};

updateOrderSchema();
