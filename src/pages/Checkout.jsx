import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [loading, setLoading] = useState(false);

    const total = getCartTotal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            orderItems: cartItems,
            shippingAddress: { address, city },
            paymentMethod,
            itemsPrice: total, // Simplified for MVP
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: total,
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const data = await response.json();
                alert('¡Pedido realizado con éxito!');
                clearCart();
                navigate('/'); // Redirect to home or order history
            } else {
                const error = await response.json();
                alert(error.message || 'Error al crear el pedido');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Tu carrito está vacío</h2>
                <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#F48646', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Volver a la tienda
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
            <button onClick={() => navigate('/cart')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1rem', color: '#666' }}>
                <ArrowLeft size={20} /> Volver al carrito
            </button>

            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>Finalizar Compra</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                {/* Form Column */}
                <div>
                    <form onSubmit={handleSubmit} id="checkout-form">
                        <section style={{ marginBottom: '2rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', marginBottom: '1rem', color: '#F48646' }}>
                                <MapPin size={20} /> Dirección de Envío
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Dirección</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        placeholder="Av. Principal 123"
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Ciudad</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                        placeholder="Lima"
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                    />
                                </div>
                            </div>
                        </section>

                        <section style={{ marginBottom: '2rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', marginBottom: '1rem', color: '#F48646' }}>
                                <CreditCard size={20} /> Método de Pago
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Credit Card"
                                        checked={paymentMethod === 'Credit Card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    Tarjeta de Crédito / Débito
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Yape"
                                        checked={paymentMethod === 'Yape'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    Yape / Plin
                                </label>
                            </div>
                        </section>
                    </form>
                </div>

                {/* Summary Column */}
                <div>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'sticky', top: '2rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Resumen del Pedido</h3>
                        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
                            {cartItems.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                    <img src={item.image || (item.images && item.images[0])} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                                        <div style={{ color: '#666' }}>Cant: {item.quantity} x S/ {parseFloat(item.price).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Subtotal</span>
                                <span>S/ {total.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Envío</span>
                                <span>Gratis</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '1rem' }}>
                                <span>Total</span>
                                <span>S/ {total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                backgroundColor: '#F48646',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                marginTop: '1.5rem',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Procesando...' : 'Confirmar Pedido'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
