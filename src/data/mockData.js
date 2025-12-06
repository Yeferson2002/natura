export const clients = [
    {
        id: 1,
        name: "Ana García",
        avatar: "https://i.pravatar.cc/150?u=1",
        lastPurchase: "Hace 15 días",
        history: ["Labial Avon Power Stay", "Esmalte Natura Una"],
        profile: "Amante del maquillaje, prefiere tonos rojos y vibrantes. Vive en zona húmeda.",
        potential: "Alto"
    },
    {
        id: 2,
        name: "Carla Mendoza",
        avatar: "https://i.pravatar.cc/150?u=2",
        lastPurchase: "Hace 45 días",
        history: ["Crema Tododia", "Jabón Ekos"],
        profile: "Enfocada en cuidado corporal y sustentabilidad. Cliente fiel de Natura.",
        potential: "Medio"
    },
    {
        id: 3,
        name: "Lucía Torres",
        avatar: "https://i.pravatar.cc/150?u=3",
        lastPurchase: "Hace 2 días",
        history: ["Perfume Essencial", "Shampoo Plant"],
        profile: "Compra regalos frecuentemente. Le gustan las fragancias amaderadas.",
        potential: "Muy Alto"
    }
];

export const products = [
    {
        id: 'p1',
        brand: 'Natura',
        line: 'Chronos',
        name: 'Protector Antiseñales FPS 50',
        price: 85.00,
        image: 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw4f3b3b3b/images/products/2023/05/70988_1.jpg', // Placeholder URL logic would be better but using string for now
        description: 'Protección solar con tratamiento antiseñales. Ideal para completar su rutina de cuidado.'
    },
    {
        id: 'p2',
        brand: 'Avon',
        line: 'Anew',
        name: 'Sérum Vitamina C',
        price: 59.90,
        image: 'https://avondigital.pe/wp-content/uploads/2023/01/ANEW-VITAMINA-C-SERUM-FACIAL-CONCENTRADO-ANTIOXIDANTE-30ML.jpg',
        description: 'Potencia la luminosidad de la piel. Complemento perfecto para sus cremas hidratantes.'
    },
    {
        id: 'p3',
        brand: 'Natura',
        line: 'Ekos',
        name: 'Frescor de Maracuyá',
        price: 75.00,
        image: 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw4f3b3b3b/images/products/2023/05/70988_1.jpg',
        description: 'Fragancia fresca y vibrante. Un clásico que nunca falla para regalo.'
    }
];

export const generateRecommendation = (client) => {
    // Simple mock logic
    if (client.profile.includes("maquillaje")) {
        return {
            product: products[0], // Chronos (Cross-sell skincare to makeup user)
            script: `Hola ${client.name.split(' ')[0]}! Como sé que te encanta cuidar tu imagen, pensé en ti al ver este Protector Chronos. Es el complemento ideal para que tu maquillaje luzca aún mejor y tu piel esté protegida. ¡Está en oferta!`
        };
    } else if (client.profile.includes("cuidado corporal")) {
        return {
            product: products[2], // Ekos Frescor
            script: `Hola ${client.name.split(' ')[0]}! Vi que disfrutas mucho de la línea Ekos. Te recomiendo probar el Frescor de Maracuyá, tiene esa misma vibra natural que te gusta. ¿Te gustaría una muestra?`
        };
    } else {
        return {
            product: products[1], // Avon Vitamin C
            script: `Hola ${client.name.split(' ')[0]}! Tengo una novedad de Avon que está increíble: el Sérum de Vitamina C. Da una luz espectacular a la piel. ¡Avísame si quieres probarlo!`
        };
    }
};
