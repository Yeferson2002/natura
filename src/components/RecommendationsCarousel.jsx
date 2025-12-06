import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './home/Home.css';
import './RecommendationsCarousel.css';
import { useCart } from '../context/CartContext';

const RecommendationsCarousel = ({ products }) => {
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { addToCart } = useCart();

    // Calculate total pages based on visibility
    useEffect(() => {
        const calculatePages = () => {
            if (scrollRef.current) {
                const containerWidth = scrollRef.current.clientWidth;
                const scrollWidth = scrollRef.current.scrollWidth;
                // If content fits, 1 page. Otherwise estimate pages.
                // A simple approximation is scrollWidth / containerWidth
                const pages = Math.ceil(scrollWidth / containerWidth);
                setTotalPages(pages > 1 ? pages : 0);
            }
        };

        calculatePages();
        window.addEventListener('resize', calculatePages);
        return () => window.removeEventListener('resize', calculatePages);
    }, [products]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const containerWidth = scrollRef.current.clientWidth;
            const scrollLeft = scrollRef.current.scrollLeft;
            const page = Math.round(scrollLeft / containerWidth);
            setActivePage(page);
        }
    };

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const containerWidth = current.clientWidth;
            const scrollAmount = containerWidth; // Scroll one full view
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollToPage = (pageIndex) => {
        const { current } = scrollRef;
        if (current) {
            const containerWidth = current.clientWidth;
            current.scrollTo({
                left: pageIndex * containerWidth,
                behavior: 'smooth'
            });
        }
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        alert('¡Producto agregado al carrito!');
    };

    return (
        <div className="recommendations-wrapper" style={{ maxWidth: '100%' }}>
            <div className="carousel-container" style={{ maxWidth: '100%' }}>
                <button className="carousel-btn prev" onClick={() => scroll('left')}>
                    <ChevronLeft size={24} />
                </button>

                <div
                    className="carousel-track"
                    ref={scrollRef}
                    onScroll={handleScroll}
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {products.map(product => (
                        <div key={product.id} className="gift-card" style={{ scrollSnapAlign: 'start' }}>
                            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                <div className="gift-image-container">
                                    {product.tag && (
                                        <span className="gift-tag" style={{ backgroundColor: product.tagColor || '#FFD5B8' }}>
                                            {product.tag}
                                        </span>
                                    )}
                                    <button className="btn-favorite" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                        <Heart size={20} />
                                    </button>
                                    <div className="gift-image-placeholder">
                                        {product.image ? <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'Imagen'}
                                    </div>
                                </div>

                                <div className="gift-info">
                                    <div className="gift-brand">{product.brand}</div>
                                    <div className="gift-name">{product.name}</div>

                                    <div className="gift-price-container">
                                        {product.originalPrice && (
                                            <div className="gift-price-original">S/ {parseFloat(product.originalPrice).toFixed(2)}</div>
                                        )}
                                        <div className="gift-price-row">
                                            <span className="gift-price-current">S/ {parseFloat(product.price).toFixed(2)}</span>
                                            {product.discount && (
                                                <span className="gift-discount-badge">{product.discount}%</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div style={{ padding: '0 1rem 1rem' }}>
                                <button
                                    className="btn-add-cart"
                                    onClick={(e) => handleAddToCart(e, product)}
                                    style={{ display: 'block', width: '100%', textAlign: 'center', cursor: 'pointer' }}
                                >
                                    agregar a mi bolsa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-btn next" onClick={() => scroll('right')}>
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
                <div className="carousel-dots">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${activePage === index ? 'active' : ''}`}
                            onClick={() => scrollToPage(index)}
                            aria-label={`Ir a la página ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendationsCarousel;
