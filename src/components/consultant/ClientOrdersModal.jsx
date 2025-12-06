import React, { useState, useEffect } from 'react';
import { X, Package, Calendar, DollarSign, ChevronRight, Bot } from 'lucide-react';
import AIChatModal from './AIChatModal';

const ClientOrdersModal = ({ isOpen, onClose, client }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        if (isOpen && client) {
            fetchOrders();
        }
    }, [isOpen, client]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const response = await fetch(`https://natura-jl7g.onrender.com/api/orders/client/${client.id}`, config);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }}>
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1f2937' }}>Pedidos de {client?.firstName}</h3>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.9rem' }}>Historial de compras</p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#9ca3af',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div style={{ padding: '0 1.5rem 1rem 1.5rem', marginTop: '1rem' }}>
                    <button
                        onClick={() => setIsChatOpen(true)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #F48646 0%, #F26E21 100%)',
                            color: 'white',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 12px rgba(244, 134, 70, 0.3)'
                        }}
                    >
                        <Bot size={20} />
                        Planificar Estrategia con IA
                    </button>
                </div>

                <div style={{ overflowY: 'auto', padding: '0 1.5rem 1.5rem 1.5rem', flex: 1 }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>Cargando pedidos...</div>
                    ) : orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                            <Package size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>Este cliente aún no ha realizado pedidos.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {orders.map(order => (
                                <div key={order.id} style={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: '600', color: '#374151' }}>Pedido #{order.id}</span>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '500',
                                            backgroundColor: order.status === 'Entregado' ? '#dcfce7' : '#fef3c7',
                                            color: order.status === 'Entregado' ? '#166534' : '#92400e'
                                        }}>
                                            {order.status}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Calendar size={16} />
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <DollarSign size={16} />
                                            S/ {order.totalPrice}
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#6b7280', fontWeight: '500' }}>Productos:</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {order.OrderItems.map((item, index) => (
                                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                                    <span style={{ color: '#4b5563' }}>{item.qty}x {item.name}</span>
                                                    <span style={{ color: '#374151', fontWeight: '500' }}>S/ {item.price * item.qty}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AIChatModal
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                client={client}
            />
        </div>
    );
};

export default ClientOrdersModal;
