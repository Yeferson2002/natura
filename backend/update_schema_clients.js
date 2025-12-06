const { sequelize } = require('./config/db');

const updateSchema = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        // 1. Create Clients table
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS Clients (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE,
                phone VARCHAR(20),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
        console.log('Clients table created or already exists.');

        // 2. Add ClientId to Orders table
        try {
            await sequelize.query(`
                ALTER TABLE Orders
                ADD COLUMN ClientId INT,
                ADD FOREIGN KEY (ClientId) REFERENCES Clients(id) ON DELETE SET NULL;
            `);
            console.log('Added ClientId column to Orders table.');
        } catch (error) {
            if (error.original && error.original.code === 'ER_DUP_FIELDNAME') {
                console.log('Column ClientId already exists in Orders table.');
            } else {
                console.error('Error adding ClientId column:', error);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('Error updating schema:', error);
        process.exit(1);
    }
};

updateSchema();
