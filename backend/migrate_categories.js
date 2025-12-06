const { Sequelize } = require('sequelize');
const { sequelize } = require('./config/db');
const Product = require('./models/Product');
const Category = require('./models/Category');

async function migrateCategories() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // 1. Create Categories table
        await Category.sync({ force: true }); // Warning: This drops the table if it exists
        console.log('Categories table created.');

        // 2. Get all products
        const products = await Product.findAll();
        console.log(`Found ${products.length} products.`);

        // 3. Extract unique categories
        const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
        console.log(`Found ${uniqueCategories.length} unique categories:`, uniqueCategories);

        // 4. Create categories in DB
        const categoryMap = {};
        for (const catName of uniqueCategories) {
            const slug = catName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const category = await Category.create({
                name: catName,
                slug: slug,
                description: `Productos de la categoría ${catName}`
            });
            categoryMap[catName] = category.id;
            console.log(`Created category: ${catName} (ID: ${category.id})`);
        }

        // 5. Add CategoryId column to Products if not exists (Sequelize usually handles this via association, but we do it manually to be safe/explicit before association)
        // Note: In Sequelize, defining the association and syncing usually adds the column. 
        // We will assume the column needs to be added or populated.

        // Let's check if we can just update the products now.
        // We need to make sure the column exists. 
        // Since we haven't synced Product model with the new association yet, we might need to add the column via raw query or just define association and sync.
        // To avoid data loss on Product table (sync force=true would wipe it), we will use alter: true or raw query.

        // Let's try adding the column via raw query to be safe and simple
        try {
            await sequelize.getQueryInterface().addColumn('Products', 'CategoryId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Categories',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            console.log('Added CategoryId column to Products table.');
        } catch (e) {
            console.log('CategoryId column might already exist or error adding it:', e.message);
        }

        // 6. Update products with CategoryId
        for (const product of products) {
            if (product.category && categoryMap[product.category]) {
                product.CategoryId = categoryMap[product.category];
                // We need to save this. Since we haven't defined the field in the model instance yet (it's not in the file we loaded), 
                // we might need to use a raw update or reload the model definition.
                // Simplest is raw update for migration.
                await sequelize.query(
                    `UPDATE Products SET CategoryId = ${categoryMap[product.category]} WHERE id = ${product.id}`
                );
                console.log(`Updated product ${product.id} with CategoryId ${categoryMap[product.category]}`);
            }
        }

        console.log('Migration completed successfully.');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await sequelize.close();
    }
}

migrateCategories();
