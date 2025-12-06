const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { connectDB, sequelize } = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Client = require('./models/Client');
const { Order, OrderItem } = require('./models/Order');
const Recommendation = require('./models/Recommendation');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));

// Define Associations
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Order, { as: 'ConsultantOrders', foreignKey: 'ConsultantId' });
Order.belongsTo(User, { as: 'Consultant', foreignKey: 'ConsultantId' });

Client.hasMany(Order);
Order.belongsTo(Client);

Client.belongsTo(User, { as: 'Consultant', foreignKey: 'ConsultantId' });
User.hasMany(Client, { foreignKey: 'ConsultantId' });

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Recommendation.belongsTo(Client);
Client.hasMany(Recommendation);
Recommendation.belongsTo(User, { foreignKey: 'ConsultantId' });
User.hasMany(Recommendation, { foreignKey: 'ConsultantId' });
Recommendation.belongsTo(Product);
Product.hasMany(Recommendation);

// Sync Database
sequelize.sync().then(() => {
    console.log('Database & tables synced!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
