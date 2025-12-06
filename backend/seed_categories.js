const { Sequelize } = require('sequelize');
const { sequelize } = require('./config/db');
const Category = require('./models/Category');

const categoriesToSeed = [
    { name: 'Perfumería', slug: 'perfumeria', description: 'Fragancias únicas que combinan arte y ciencia.' },
    { name: 'Cuidados Diarios', slug: 'cuidados-diarios', description: 'Productos para el cuidado diario de tu piel.' },
    { name: 'Cabello', slug: 'cabello', description: 'Tratamientos y cuidados para todo tipo de cabello.' },
    { name: 'Maquillaje', slug: 'maquillaje', description: 'Realza tu belleza con nuestros productos de maquillaje.' },
    { name: 'Rostro', slug: 'rostro', description: 'Cuidado especializado para la piel de tu rostro.' },
    { name: 'Regalos', slug: 'regalos', description: 'Opciones perfectas para regalar en cualquier ocasión.' },
    { name: 'Casa', slug: 'casa', description: 'Productos para armonizar y perfumar tu hogar.' }
];

async function seedCategories() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        for (const cat of categoriesToSeed) {
            try {
                // Check by slug first
                let category = await Category.findOne({ where: { slug: cat.slug } });

                if (!category) {
                    // Check by name just in case
                    category = await Category.findOne({ where: { name: cat.name } });
                }

                if (category) {
                    console.log(`Category already exists: ${cat.name}`);
                    // Update if needed
                    if (category.name !== cat.name || category.description !== cat.description) {
                        category.name = cat.name;
                        category.description = cat.description;
                        await category.save();
                        console.log(`Updated category: ${cat.name}`);
                    }
                } else {
                    await Category.create(cat);
                    console.log(`Created category: ${cat.name}`);
                }
            } catch (err) {
                console.error(`Error processing category ${cat.name}:`, err.message);
            }
        }

        console.log('Categories seeded successfully.');

    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
}

seedCategories();
