const { GoogleGenerativeAI } = require("@google/generative-ai");
const asyncHandler = require('express-async-handler');
const { Order, OrderItem } = require('../models/Order');
const Client = require('../models/Client');
const Product = require('../models/Product');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Chat with AI about client plan
// @route   POST /api/ai/chat
// @access  Private/Consultant
const chatWithClientPlan = asyncHandler(async (req, res) => {
    const { clientId, message, history } = req.body;

    if (!clientId || !message) {
        res.status(400);
        throw new Error('Client ID and message are required');
    }

    // 1. Fetch Client Data and Order History
    const client = await Client.findByPk(clientId);
    if (!client) {
        res.status(404);
        throw new Error('Client not found');
    }

    const orders = await Order.findAll({
        where: { ClientId: clientId },
        include: [
            {
                model: OrderItem,
                as: 'OrderItems'
            }
        ],
        order: [['createdAt', 'DESC']],
        limit: 5 // Limit to last 5 orders for context
    });

    // 2. Fetch Product Catalog (Available products)
    const availableProducts = await Product.findAll({
        where: { status: 'Disponible' },
        attributes: ['id', 'name', 'price', 'image', 'description', 'brand'],
        limit: 50 // Limit to 50 products to avoid token limits
    });

    // 3. Identify Recent Purchases (Last 2 orders)
    const recentPurchases = new Set();
    if (orders.length > 0) {
        const recentOrders = orders.slice(0, 2);
        recentOrders.forEach(order => {
            order.OrderItems.forEach(item => {
                recentPurchases.add(item.name.toLowerCase());
            });
        });
    }

    // 4. Construct Context for Gemini
    let context = `Estás actuando como un asistente experto para una consultora de belleza de Natura. 
    Tu objetivo es ayudar a la consultora a planificar estrategias de venta y fidelización para su cliente: ${client.firstName} ${client.lastName}.
    
    Catálogo de Productos Disponibles (Úsalos para sugerencias):
    Catálogo de Productos Disponibles (Úsalos para sugerencias):
    ${availableProducts.map(p => `- ID:${p.id} | ${p.name} (${p.brand}): S/ ${p.price} [${p.image}]`).join('\n')}

    Historial de pedidos recientes del cliente:
    `;

    if (orders.length === 0) {
        context += "Este cliente aún no ha realizado pedidos.\n";
    } else {
        orders.forEach(order => {
            context += `- Pedido del ${new Date(order.createdAt).toLocaleDateString()} (Total: S/ ${order.totalPrice}):\n`;
            order.OrderItems.forEach(item => {
                context += `  * ${item.qty}x ${item.name} (ID: ${item.ProductId || 'N/A'}, Precio: S/ ${item.price}, Imagen: ${item.image})\n`;
            });
        });
    }

    context += `
    
    Instrucciones:
    - Analiza el historial de compras para identificar preferencias (perfumes, maquillaje, cuidado de piel, etc.).
    - Sugiere productos complementarios o nuevos lanzamientos del catálogo que podrían interesarle.
    - NO sugieras productos que el cliente haya comprado en sus últimos 2 pedidos (ya los tiene). Enfócate en reposición de productos antiguos o novedades.
    - Propón una estrategia de contacto (ej. cuándo llamar, qué ofrecer).
    - Responde de manera concisa, profesional y motivadora para la consultora.
    - IMPORTANTE: Cuando menciones productos específicos que el cliente ha comprado o que sugieres, DEBES usar el siguiente formato EXACTO para que se muestren visualmente:
      <<<PRODUCT:{id}|{nombre del producto}|{precio}|{url de la imagen}|{razón de marketing corta y persuasiva}>>>
    - La "razón de marketing" debe ser una frase corta (max 15 palabras) que explique por qué este producto es ideal para ESTE cliente específico (ej: "Ideal para tus reuniones por su aroma elegante").
    - Si el producto es del catálogo, USA EL ID DEL CATÁLOGO. Si es un producto comprado anteriormente y no tienes el ID, usa "0".
    - Si no tienes la URL de la imagen de un producto sugerido, usa una URL genérica o la del producto comprado anteriormente si es relevante.
    - Si el usuario te hace una pregunta específica, responde a esa pregunta usando el contexto del cliente.
    
    Historial de chat reciente:
    ${history ? history.map(h => `${h.role}: ${h.content}`).join('\n') : ''}
    
    Pregunta actual de la consultora: ${message}
    `;

    // 3. Call Gemini API
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(context);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500);
        throw new Error('Error generating AI response');
    }
});

module.exports = {
    chatWithClientPlan
};
