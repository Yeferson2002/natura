const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const createDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database '${process.env.DB_NAME}' created or already exists.`);

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Error creating database:', error);
        console.error('Make sure XAMPP MySQL is running!');
        process.exit(1);
    }
};

createDatabase();
