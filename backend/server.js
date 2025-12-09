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
const corsOptions = {
    origin: ['http://localhost:5173', 'https://natura-chi.vercel.app', 'http://localhost:3000'],
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));

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
const Category = require('./models/Category'); // Import Category model

// ... (rutas existentes)
app.use('/api/recommendations', require('./routes/recommendationRoutes'));

// --- RUTA MAGIC SEEDER ---
app.get('/api/seed-database', async (req, res) => {
    try {
        // 1. Crear Categorías
        const categoriesData = [
            { id: 1, name: 'perfumería', slug: 'perfumeria', description: 'Fragancias únicas.' },
            { id: 6, name: 'cuidados diarios', slug: 'cuidados-diarios', description: 'Cuidado de piel.' },
            { id: 7, name: 'cabello', slug: 'cabello', description: 'Tratamientos capilares.' },
            { id: 8, name: 'maquillaje', slug: 'maquillaje', description: 'Realza tu belleza.' },
            { id: 9, name: 'rostro', slug: 'rostro', description: 'Cuidado facial.' },
            { id: 10, name: 'regalos', slug: 'regalos', description: 'Opciones para regalar.' },
            { id: 11, name: 'casa', slug: 'casa', description: 'Perfuma tu hogar.' }
        ];

        for (const cat of categoriesData) {
            await Category.findOrCreate({ where: { id: cat.id }, defaults: cat });
        }

        // 2. Crear Productos
        const productsData = [
            {
                id: 1,
                name: 'Regalo Essencial Exclusivo Masculino',
                brand: 'Essencial',
                price: 115.00,
                originalPrice: 230.00,
                discount: 50,
                stock: 10,
                image: 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw9bf139b7/ProdutoJoia/mobile/217081.jpg',
                description: 'Fragancia amaderada intensa.',
                CategoryId: 1
            },
            {
                id: 2,
                name: 'Regalo Homem Potence',
                brand: 'Homem',
                price: 96.00,
                originalPrice: 160.00,
                discount: 40,
                stock: 15,
                image: 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw8ce2b50c/ProdutoJoia/mobile/217075.jpg',
                description: 'Maderas nobles con pimienta negra.',
                CategoryId: 1
            },
            {
                id: 3,
                name: 'Regalo Ritual Humor Paz y Humor',
                brand: 'Humor',
                price: 84.00,
                originalPrice: 120.00,
                discount: 30,
                stock: 20,
                image: 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwfc1cc325/ProdutoJoia/mobile/217074.jpg',
                description: 'Fragancia irreverente y frutal.',
                CategoryId: 1
            },
            {
                id: 4,
                name: 'Regalo Kaiak Clásico Masculino',
                brand: 'Kaiak',
                price: 98.00,
                originalPrice: 140.00,
                discount: 30,
                stock: 12,
                image: 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw6d60ead3/ProdutoJoia/mobile/217064.jpg',
                description: 'Frescura vibrante de hierbas.',
                CategoryId: 1
            },
            {
                id: 7,
                name: 'Ekos Néctar hidratante maracuyá',
                brand: 'Ekos',
                price: 34.50,
                originalPrice: 69.00,
                discount: 50,
                stock: 50,
                image: 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwb0004df3/ProdutoJoia/mobile/82509.jpg',
                description: 'Hidratación calmante.',
                CategoryId: 6
            }
        ];

        for (const prod of productsData) {
            await Product.findOrCreate({ where: { id: prod.id }, defaults: prod });
        }

        // 3. Crear Usuario Admin Test (si no existe)
        const adminEmail = 'admin@example.com';
        const adminExists = await User.findOne({ where: { email: adminEmail } });
        if (!adminExists) {
            await User.create({
                firstName: 'Admin',
                lastName: 'User',
                dni: '12345678',
                email: adminEmail,
                password: 'password123', // El hook lo hasheará
                role: 'admin',
                status: 'Activa'
            });
        }

        res.send('<h1>¡Base de Datos Poblada con Éxito! 🚀</h1><p>Ya puedes recargar tu página de Vercel.</p>');
    } catch (error) {
        console.error("Seed error:", error);
        res.status(500).send(`Error poblando BD: ${error.message}`);
    }
});

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
