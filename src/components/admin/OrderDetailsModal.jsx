import React from 'react';
import { X, MapPin, CreditCard, Package, User } from 'lucide-react';

const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>
                            Pedido {order.id}
                        </h2>
                        <span style={{
                            fontSize: '0.875rem',
                            color: '#6b7280'
                        }}>
                            Realizado el {order.date}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '50%',
                            border: 'none',
                            backgroundColor: '#f3f4f6',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <X size={20} color="#4b5563" />
                    </button>
                </div>

                <div style={{ padding: '1.5rem' }}>
                    {/* Status Bar */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '2rem',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{
                            flex: 1,
                            padding: '1rem',
                            backgroundColor: '#f9fafb',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                                <User size={16} />
                                Cliente
                            </div>
                            <div style={{ fontWeight: '600', color: '#1f2937' }}>{order.customer}</div>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{order.email}</div>
                        </div>
                        <div style={{
                            flex: 1,
                            padding: '1rem',
                            backgroundColor: '#f9fafb',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                                <MapPin size={16} />
                                Envío
                            </div>
                            <div style={{ fontWeight: '600', color: '#1f2937' }}>Dirección de Entrega</div>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{order.shippingAddress?.address || 'Dirección no disponible'}</div>
                        </div>
                        <div style={{
                            flex: 1,
                            padding: '1rem',
                            backgroundColor: '#f9fafb',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                                <CreditCard size={16} />
                                Pago
                            </div>
                            <div style={{ fontWeight: '600', color: '#1f2937' }}>{order.payment}</div>
                            <div style={{
                                fontSize: '0.875rem',
                                color: order.isPaid ? '#10b981' : '#f59e0b',
                                fontWeight: '500'
                            }}>
                                {order.isPaid ? 'Pagado' : 'Pendiente de Pago'}
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Package size={20} />
                        Productos ({order.itemsCount})
                    </h3>
                    <div style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        marginBottom: '2rem'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#f9fafb' }}>
                                <tr>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280', fontWeight: '600' }}>Producto</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280', fontWeight: '600' }}>Cant.</th>
                                    <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', color: '#6b7280', fontWeight: '600' }}>Precio Unit.</th>
                                    <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', color: '#6b7280', fontWeight: '600' }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.orderItems && order.orderItems.map((item, index) => (
                                    <tr key={index} style={{ borderTop: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', backgroundColor: '#f3f4f6' }}
                                                />
                                                <span style={{ fontWeight: '500', color: '#374151' }}>{item.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>{item.qty}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right', color: '#6b7280' }}>S/ {parseFloat(item.price).toFixed(2)}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#374151' }}>
                                            S/ {(parseFloat(item.price) * item.qty).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ width: '300px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#6b7280' }}>
                                <span>Subtotal</span>
                                <span>S/ {order.itemsPrice}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#6b7280' }}>
                                <span>Envío</span>
                                <span>S/ {order.shippingPrice}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#6b7280' }}>
                                <span>Impuestos</span>
                                <span>S/ {order.taxPrice}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingTop: '1rem',
                                borderTop: '1px solid #e5e7eb',
                                fontWeight: '700',
                                color: '#1f2937',
                                fontSize: '1.1rem'
                            }}>
                                <span>Total</span>
                                <span>{order.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
