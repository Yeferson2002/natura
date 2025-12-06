const { sequelize } = require('./config/db');

const updateSchema = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        try {
            await sequelize.query('ALTER TABLE Users ADD COLUMN phone VARCHAR(20);');
            console.log('Successfully added phone column to Users table.');
        } catch (error) {
            if (error.original && error.original.code === 'ER_DUP_FIELDNAME') {
                console.log('Column phone already exists in Users table.');
            } else {
                console.error('Error adding column:', error);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

updateSchema();
