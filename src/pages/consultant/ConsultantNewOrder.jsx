import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Plus, Filter } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ConsultantNewOrder = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart, getCartTotal, cartItems } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://natura-jl7g.onrender.com/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        // Optional: Show toast notification
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            (product.Category && product.Category.name.toLowerCase() === selectedCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    // Extract unique categories for filter
    const categories = ['all', ...new Set(products.map(p => p.Category?.name).filter(Boolean))];

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '80px' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>Nuevo Pedido</h1>
                    <p style={{ color: '#6b7280' }}>Selecciona los productos que deseas pedir.</p>
                </div>
                <button
                    onClick={() => navigate('/cart')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#F48646',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(244, 134, 70, 0.3)'
                    }}
                >
                    <ShoppingCart size={20} />
                    Ver Carrito ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </button>
            </div>

            {/* Search and Filter */}
            <div style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 3rem',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            outline: 'none'
                        }}
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        outline: 'none',
                        backgroundColor: 'white',
                        minWidth: '200px'
                    }}
                >
                    <option value="all">Todas las Categorías</option>
                    {categories.filter(c => c !== 'all').map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando productos...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {filteredProducts.map((product) => (
                        <div key={product.id} style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            border: '1px solid #e5e7eb',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s',
                            cursor: 'default'
                        }}>
                            <div style={{ position: 'relative', height: '200px' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/250'; }}
                                />
                                {product.discount > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '0.75rem',
                                        left: '0.75rem',
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}>
                                        -{product.discount}%
                                    </div>
                                )}
                            </div>

                            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>{product.brand}</div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem', flex: 1 }}>{product.name}</h3>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                                    <div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937' }}>S/ {product.price}</div>
                                        {product.originalPrice && (
                                            <div style={{ fontSize: '0.85rem', color: '#9ca3af', textDecoration: 'line-through' }}>S/ {product.originalPrice}</div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        style={{
                                            padding: '0.5rem',
                                            backgroundColor: '#fff7ed',
                                            color: '#F48646',
                                            border: '1px solid #F48646',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        title="Agregar al carrito"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Floating Cart Button (Mobile) */}
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 100,
                display: 'none' // Hidden on desktop by default, can use media query if needed
            }}>
                <button
                    onClick={() => navigate('/cart')}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#F48646',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(244, 134, 70, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <ShoppingCart size={28} />
                    {cartItems.length > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                        }}>
                            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ConsultantNewOrder;
