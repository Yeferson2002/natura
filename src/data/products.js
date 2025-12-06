
export const perfumes = [
    {
        id: 1,
        brand: 'Essencial',
        name: 'Regalo Essencial Exclusivo Masculino',
        tag: 'Mega Promo',
        tagColor: '#A7C7E7',
        priceOriginal: 'S/ 230.00',
        priceCurrent: 'S/ 138.00',
        discount: '-40%',
        description: 'Una fragancia amaderada intensa que combina la potencia de las maderas profundas con notas de especias frías. Ideal para ocasiones especiales.',
        images: ['#A7C7E7', '#8bb8e8', '#6fa9e9']
    },
    {
        id: 2,
        brand: 'Homem',
        name: 'Regalo Homem Potence',
        tag: 'imperdibles',
        tagColor: '#F48646',
        priceOriginal: 'S/ 160.00',
        priceCurrent: 'S/ 96.00',
        discount: '-40%',
        description: 'Para el hombre que se expresa con intensidad. Una combinación marcante de maderas nobles con pimienta negra.',
        images: ['#F48646', '#f59a66', '#f6ae86']
    },
    {
        id: 3,
        brand: 'Humor',
        name: 'Regalo Ritual Humor Paz y Humor',
        tag: 'promoción',
        tagColor: '#FFE4C4',
        priceOriginal: 'S/ 120.00',
        priceCurrent: 'S/ 84.00',
        discount: '-30%',
        description: 'Una fragancia irreverente y llena de humor. Notas frutales mezcladas con un toque de especias.',
        images: ['#FFE4C4', '#ffedcc', '#fff6e5']
    },
    {
        id: 4,
        brand: 'Kaiak',
        name: 'Regalo Kaiak Clásico Masculino con Hidratante',
        tag: 'promoción',
        tagColor: '#FFE4C4',
        priceOriginal: 'S/ 140.00',
        priceCurrent: 'S/ 98.00',
        discount: '-30%',
        description: 'La frescura vibrante de las hierbas y bergamota. Un clásico que renueva las energías.',
        images: ['#FFE4C4', '#ffedcc', '#fff6e5']
    },
    {
        id: 5,
        brand: 'Humor',
        name: 'Regalo Meu Primeiro Humor',
        tag: 'Mega Promo',
        tagColor: '#A7C7E7',
        priceOriginal: 'S/ 115.00',
        priceCurrent: 'S/ 69.00',
        discount: '-40%',
        description: 'El encuentro de las notas cítricas con un cóctel de frutas, vibrante y alegre.',
        images: ['#A7C7E7', '#8bb8e8', '#6fa9e9']
    }
];

export const getProductById = (id) => {
    return perfumes.find(product => product.id === parseInt(id));
};
