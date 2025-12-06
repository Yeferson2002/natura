const { sequelize } = require('./config/db');

const checkOrderItems = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        const [results, metadata] = await sequelize.query("SELECT * FROM OrderItems");
        console.log(`Found ${results.length} rows in OrderItems table.`);
        if (results.length > 0) {
            console.log('Sample item:', results[0]);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error checking DB:', error);
        process.exit(1);
    }
};

checkOrderItems();
