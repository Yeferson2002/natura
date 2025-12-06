import React, { useRef, useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, Headphones } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import '../components/home/Home.css';
import { useCart } from '../context/CartContext';

const Perfumery = () => {
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://natura-jl7g.onrender.com/api/products');
                const data = await response.json();
                // Filtrar por categoría 'Perfumería' usando la relación de base de datos
                const perfumeryProducts = data.filter(product =>
                    product.Category && product.Category.name.toLowerCase().includes('perfumería')
                );
                setProducts(perfumeryProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 300;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        addToCart(product);
        alert('¡Producto agregado al carrito!');
    };

    if (loading) {
        return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Cargando productos...</div>;
    }

    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Breadcrumb */}
            <div className="container" style={{ padding: '1rem 0', fontSize: '0.85rem', color: '#666', textAlign: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>inicio</Link> <span style={{ margin: '0 0.5rem' }}>•</span> <span style={{ fontWeight: 'bold' }}>perfumería</span>
            </div>

            {/* Header */}
            <div className="container" style={{ textAlign: 'center', padding: '2rem 0 4rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>perfumería</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: '#666', lineHeight: '1.6' }}>
                    ¡nuestra manera única de crear fragancias combina arte, ciencia, naturaleza y tecnología para que tengas una experiencia inolvidable!
                </p>
            </div>

            {/* Section Title */}
            <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>regala fragancias únicas</h2>
            </div>

            {/* Product Carousel */}
            <div className="container" style={{ position: 'relative' }}>
                {products.length > 0 ? (
                    <div className="carousel-container">
                        <button className="carousel-btn prev" onClick={() => scroll('left')}>
                            <ChevronLeft size={24} />
                        </button>

                        <div className="carousel-track" ref={scrollRef}>
                            {products.map(product => (
                                <div
                                    key={product.id}
                                    className="gift-card"
                                    onClick={() => handleProductClick(product.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="gift-image-container">
                                        {/* Usar la primera imagen del array de imágenes o la imagen principal */}
                                        <img
                                            src={(() => {
                                                const imgPath = (product.images && product.images.length > 0) ? product.images[0] : product.image;
                                                if (!imgPath) return 'https://via.placeholder.com/280';
                                                if (imgPath.startsWith('http')) return imgPath;
                                                return `https://natura-jl7g.onrender.com${imgPath}`;
                                            })()}
                                            alt={product.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/280'; }}
                                        />

                                        {product.discount > 0 && (
                                            <span className="gift-tag" style={{ backgroundColor: '#E33E38', color: 'white' }}>
                                                {product.discount}% OFF
                                            </span>
                                        )}
                                        <button className="btn-favorite" onClick={(e) => e.stopPropagation()}>
                                            <Heart size={20} />
                                        </button>
                                    </div>

                                    <div className="gift-info">
                                        <div className="gift-brand">{product.brand}</div>
                                        <div className="gift-name">{product.name}</div>

                                        <div className="gift-price-container">
                                            <div className="gift-price-row">
                                                <span className="gift-price-current">S/ {product.price}</span>
                                                {product.originalPrice && <span className="gift-price-original" style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>S/ {product.originalPrice}</span>}
                                            </div>
                                        </div>

                                        <button className="btn-add-cart" onClick={(e) => handleAddToCart(e, product)}>Agregar</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="carousel-btn next" onClick={() => scroll('right')}>
                            <ChevronRight size={24} />
                        </button>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                        No se encontraron productos en esta categoría.
                    </div>
                )}
            </div>

            {/* Accessibility Icon */}
            <div style={{ position: 'fixed', left: '2rem', bottom: '2rem', zIndex: 100 }}>
                <button style={{
                    background: '#FFD700',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#333',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                    <Headphones size={28} />
                </button>
            </div>
        </div>
    );
};

export default Perfumery;
