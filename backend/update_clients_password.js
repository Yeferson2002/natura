const { sequelize } = require('./config/db');

const updateClientsPassword = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        // Add password column to Clients table
        try {
            await sequelize.query(`
                ALTER TABLE Clients
                ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT 'temp_password';
            `);
            console.log('Added password column to Clients table.');
        } catch (error) {
            if (error.original && error.original.code === 'ER_DUP_FIELDNAME') {
                console.log('Column password already exists in Clients table.');
            } else {
                console.error('Error adding password column:', error);
            }
        }

        // Note: We are NOT modifying the Users table ENUM here because it's risky and complex in a script.
        // The code change in database_setup.sql handles future setups.
        // Existing users with 'client' role will remain but might be ignored by application logic.

        process.exit(0);
    } catch (error) {
        console.error('Error updating schema:', error);
        process.exit(1);
    }
};

updateClientsPassword();
