import React, { useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useCart } from '../../context/CartContext';

const GiftSection = () => {
    const [gifts, setGifts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const scrollRef = useRef(null);
    const { addToCart } = useCart();

    React.useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await fetch('https://natura-jl7g.onrender.com/api/products');
                const data = await response.json();

                // Filter for gifts if needed, or just use all products for now
                // In a real app, we might filter by category 'Regalos' or similar
                // For this demo, we'll use products that start with "Regalo" or just all
                const giftProducts = data.filter(p => p.name.includes('Regalo') || p.name.includes('Kit'));

                setGifts(giftProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching gifts:', error);
                setError('Error cargando regalos. Verifica la conexión o recarga.');
                setLoading(false);
            }
        };

        fetchGifts();
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

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        addToCart(product);
        alert('¡Producto agregado al carrito!');
    };

    if (loading) {
        return <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>Cargando regalos...</div>;
    }

    if (error) {
        return <div className="container" style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>;
    }

    return (
        <section className="gift-section container">
            <h2 className="section-title">tu regalo perfecto en natura</h2>

            <div className="carousel-container">
                <button className="carousel-btn prev" onClick={() => scroll('left')}>
                    <ChevronLeft size={24} />
                </button>

                <div className="carousel-track" ref={scrollRef}>
                    {gifts.map(gift => (
                        <div key={gift.id} className="gift-card">
                            <Link to={`/product/${gift.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                <div className="gift-image-container">
                                    {/* Logic for tags could be improved based on DB data */}
                                    {gift.discount > 30 && (
                                        <span className="gift-tag" style={{ backgroundColor: '#A7C7E7' }}>
                                            Mega Promo
                                        </span>
                                    )}
                                    <button className="btn-favorite" onClick={(e) => e.preventDefault()}>
                                        <Heart size={20} />
                                    </button>
                                    <div className="gift-image-placeholder" style={{ overflow: 'hidden', backgroundColor: '#fff' }}>
                                        {gift.image ? (
                                            <img src={gift.image} alt={gift.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span>Imagen</span>
                                        )}
                                    </div>
                                </div>

                                <div className="gift-info">
                                    <div className="gift-brand">{gift.brand}</div>
                                    <div className="gift-name">{gift.name}</div>

                                    <div className="gift-price-container">
                                        {gift.originalPrice && (
                                            <div className="gift-price-original">S/ {gift.originalPrice}</div>
                                        )}
                                        <div className="gift-price-row">
                                            <span className="gift-price-current">S/ {gift.price}</span>
                                            {gift.discount > 0 && (
                                                <span className="gift-discount-badge">-{gift.discount}%</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div style={{ padding: '0 1rem 1rem' }}>
                                <button
                                    onClick={(e) => handleAddToCart(e, gift)}
                                    className="btn-add-cart"
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Agregar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-btn next" onClick={() => scroll('right')}>
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
};

export default GiftSection;
