const { sequelize } = require('./config/db');
const User = require('./models/User');

const verifyUpdate = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        // Find a consultant or create one
        let user = await User.findOne({ where: { role: 'consultant' } });
        if (!user) {
            console.log('No consultant found, creating one...');
            user = await User.create({
                firstName: 'Test',
                lastName: 'Consultant',
                email: 'test@consultant.com',
                dni: '12345678',
                password: 'password',
                role: 'consultant'
            });
        }

        console.log('User found:', user.id, user.firstName);
        console.log('Current phone:', user.phone);

        // Update phone
        const newPhone = '987654321';
        user.phone = newPhone;
        await user.save();

        console.log('Updated phone to:', newPhone);

        // Fetch again to verify
        const updatedUser = await User.findByPk(user.id);
        console.log('Fetched phone:', updatedUser.phone);

        if (updatedUser.phone === newPhone) {
            console.log('SUCCESS: Phone updated correctly in DB.');
        } else {
            console.log('FAILURE: Phone did not update.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

verifyUpdate();
