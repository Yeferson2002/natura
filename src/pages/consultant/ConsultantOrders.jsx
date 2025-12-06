import React, { useState, useEffect } from 'react';
import { Package, Calendar, DollarSign, ChevronDown, ChevronUp, User } from 'lucide-react';

const ConsultantOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            const response = await fetch('https://natura-jl7g.onrender.com/api/orders/myorders', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setOrders(data);
            } else {
                console.error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleOrder = (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Entregado': return '#dcfce7'; // green-100
            case 'Enviado': return '#dbeafe'; // blue-100
            case 'Pendiente': return '#fef9c3'; // yellow-100
            default: return '#f3f4f6'; // gray-100
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'Entregado': return '#166534'; // green-800
            case 'Enviado': return '#1e40af'; // blue-800
            case 'Pendiente': return '#854d0e'; // yellow-800
            default: return '#374151'; // gray-700
        }
    };

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>Mis Pedidos</h1>
                <p style={{ color: '#6b7280' }}>Historial de todos tus pedidos y los de tus clientes.</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando pedidos...</div>
            ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '12px', color: '#6b7280' }}>
                    <Package size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>No has realizado ningún pedido aún.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orders.map((order) => (
                        <div key={order.id} style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            border: '1px solid #e5e7eb'
                        }}>
                            <div
                                onClick={() => toggleOrder(order.id)}
                                style={{
                                    padding: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    backgroundColor: expandedOrder === order.id ? '#f9fafb' : 'white'
                                }}
                            >
                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ padding: '0.5rem', backgroundColor: '#fff7ed', borderRadius: '8px', color: '#F48646' }}>
                                            <Package size={24} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#1f2937' }}>Pedido #{order.id}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Calendar size={14} />
                                                {formatDate(order.createdAt)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Personal orders don't have a Client associated in this context */}

                                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <div style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            backgroundColor: getStatusColor(order.status),
                                            color: getStatusTextColor(order.status)
                                        }}>
                                            {order.status}
                                        </div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1f2937' }}>
                                            S/ {order.totalPrice}
                                        </div>
                                        {expandedOrder === order.id ? <ChevronUp size={20} color="#6b7280" /> : <ChevronDown size={20} color="#6b7280" />}
                                    </div>
                                </div>
                            </div>

                            {expandedOrder === order.id && (
                                <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#fafafa' }}>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>Detalles del Pedido</h4>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {order.OrderItems.map((item, index) => (
                                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                                                />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: '500', color: '#1f2937' }}>{item.name}</div>
                                                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Cant: {item.qty} x S/ {item.price}</div>
                                                </div>
                                                <div style={{ fontWeight: '600', color: '#374151' }}>
                                                    S/ {(item.qty * item.price).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '2rem', fontSize: '0.9rem' }}>
                                        <div style={{ color: '#6b7280' }}>Envío: S/ {order.shippingPrice}</div>
                                        <div style={{ color: '#6b7280' }}>Impuestos: S/ {order.taxPrice}</div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#F48646' }}>Total: S/ {order.totalPrice}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConsultantOrders;
