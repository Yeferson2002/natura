import React, { useState, useEffect } from 'react';
import { Trash2, Gift, Info, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import RecommendationsCarousel from '../components/RecommendationsCarousel';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const navigate = useNavigate();
    const [isGiftOpen, setIsGiftOpen] = useState(true);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartSubtotal, getCartDiscount } = useCart();
    const { user } = useAuth();

    const handleCheckout = () => {
        if (!user) {
            alert("Debes iniciar sesión para finalizar la compra.");
            navigate('/login');
            return;
        }
        navigate('/checkout');
    };

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch('https://natura-jl7g.onrender.com/api/products');
                const data = await response.json();
                // Shuffle or select random products for recommendations
                const shuffled = data.sort(() => 0.5 - Math.random());
                setRecommendations(shuffled.slice(0, 10)); // Show 10 random products
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, []);

    const subtotal = getCartSubtotal();
    const discounts = getCartDiscount();
    const total = getCartTotal();

    return (
        <div className="cart-page">
            <div className="cart-container">
                {/* Left Column */}
                <div className="cart-main">
                    <div className="cart-header">
                        <div>
                            <h1 className="cart-title">mi bolsa de compras</h1>
                            <p className="cart-subtitle">{cartItems.length} productos agregados</p>
                        </div>
                        <a href="#" className="share-cart">
                            <Share2 size={16} />
                            compartir mi bolsa de compras
                        </a>
                    </div>

                    {cartItems.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <p>Tu bolsa de compras está vacía.</p>
                            <Link to="/" style={{ color: '#F48646', fontWeight: 'bold' }}>Ir a comprar</Link>
                        </div>
                    ) : (
                        <div className="cart-items">
                            <div className="cart-items-header">
                                <div>producto</div>
                                <div>cantidad</div>
                                <div>precio</div>
                                <div></div>
                            </div>
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-product">
                                        <div className="item-image">
                                            <img
                                                src={item.image || (item.images && item.images[0]) || 'https://via.placeholder.com/80'}
                                                alt={item.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="item-name">{item.name}</div>
                                    </div>
                                    <div className="item-quantity">
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="item-price">
                                        {item.originalPrice && (
                                            <span className="price-original">S/ {parseFloat(item.originalPrice).toFixed(2)}</span>
                                        )}
                                        <div>
                                            <span className="price-current">S/ {parseFloat(item.price).toFixed(2)}</span>
                                            {item.discount && (
                                                <span className="price-discount">-{item.discount}%</span>
                                            )}
                                        </div>
                                    </div>
                                    <button className="btn-delete" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="cart-recommendations">
                        <div className="cart-items">
                            <h2 className="cart-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>recomendaciones para ti ¡agregalos a tu bolsa!</h2>
                            <RecommendationsCarousel products={recommendations} />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="cart-sidebar">
                    <div className="gift-option">
                        <div
                            className="gift-header"
                            onClick={() => setIsGiftOpen(!isGiftOpen)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Gift size={20} />
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#333' }}>¿algún producto es un regalo?</div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#666' }}>personalízalo a tu manera.</div>
                                </div>
                            </div>
                            {isGiftOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {isGiftOpen && (
                            <div className="gift-content" style={{ marginTop: '1rem', borderTop: '1px solid #ffdcc4', paddingTop: '1rem' }}>
                                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>selecciona cómo quieres entregarlo:</div>
                                <div className="delivery-card" style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'flex-start',
                                    padding: '1rem',
                                    border: '1px solid #f48646',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{ fontSize: '1.5rem' }}>🛍️</div>
                                    <div>
                                        <div style={{ fontWeight: 'bold', color: '#f48646' }}>tú entregas</div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>recibe los productos y tú preparas el regalo.</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="coupon-section">
                        <div className="coupon-title">
                            cupón de descuento
                            <Info size={16} color="#999" />
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>entra en tu cuenta para aplicar tu cupón</p>
                        <button className="btn-login">entrar a mi cuenta</button>
                    </div>

                    <div className="order-summary">
                        <h3 className="summary-title">resumen de tu compra</h3>
                        <div className="summary-row">
                            <span>{cartItems.length} productos</span>
                            <span>S/ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row discount">
                            <span>descuentos</span>
                            <span>-S/ {discounts.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>subtotal</span>
                            <span>S/ {total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row" style={{ alignItems: 'center' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                entrega <Info size={16} color="#3b82f6" />
                            </span>
                            {/* Delivery price is usually calculated later or free, image doesn't show price, assuming empty or TBD */}
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total">
                            <span>total</span>
                            <span>S/ {total.toFixed(2)}</span>
                        </div>

                        <button className="btn-checkout" onClick={handleCheckout}>finalizar compra</button>
                        <button className="btn-continue" onClick={() => navigate('/')}>continuar comprando</button>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Footer */}
            <div className="mobile-summary-footer">
                <button
                    className="btn-toggle-summary"
                    onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                >
                    ver resumen {isSummaryOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>

                {isSummaryOpen && (
                    <div className="mobile-summary-content">
                        <div className="summary-row">
                            <span>{cartItems.length} productos</span>
                            <span>S/ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row discount">
                            <span>descuentos</span>
                            <span>-S/ {discounts.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>subtotal</span>
                            <span>S/ {total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row" style={{ alignItems: 'center' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                entrega <Info size={16} color="#3b82f6" />
                            </span>
                        </div>
                        <div className="summary-divider"></div>
                    </div>
                )}

                <div className="mobile-footer-bottom">
                    <div className="mobile-total">
                        <span className="total-label">total</span>
                        <span className="total-amount">S/ {total.toFixed(2)}</span>
                    </div>
                    <button className="btn-checkout" onClick={handleCheckout}>finalizar compra</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
