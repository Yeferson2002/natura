import React, { useState, useEffect } from 'react';
import { Search, Eye, Filter, ShoppingBag, Calendar, DollarSign, User } from 'lucide-react';
import OrderDetailsModal from '../../components/admin/OrderDetailsModal';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, config);
                const data = await response.json();

                const transformedOrders = data.map(order => ({
                    id: `#ORD-${order.id.toString().padStart(3, '0')}`,
                    customer: order.Client ? `${order.Client.firstName} ${order.Client.lastName}` : 'Cliente Desconocido',
                    email: order.Client ? order.Client.email : '',
                    date: new Date(order.createdAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' }),
                    total: `S/ ${parseFloat(order.totalPrice).toFixed(2)}`,
                    status: order.status,
                    items: order.OrderItems ? order.OrderItems.reduce((acc, item) => acc + item.qty, 0) : 0,
                    payment: order.paymentMethod,
                    // Full details for modal
                    shippingAddress: typeof order.shippingAddress === 'string' ? JSON.parse(order.shippingAddress) : order.shippingAddress,
                    itemsPrice: parseFloat(order.itemsPrice).toFixed(2),
                    taxPrice: parseFloat(order.taxPrice).toFixed(2),
                    shippingPrice: parseFloat(order.shippingPrice).toFixed(2),
                    isPaid: order.isPaid,
                    orderItems: order.OrderItems,
                    itemsCount: order.OrderItems ? order.OrderItems.reduce((acc, item) => acc + item.qty, 0) : 0
                }));

                setOrders(transformedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Actions Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ position: 'relative', minWidth: '300px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                        type="text"
                        placeholder="Buscar pedido por ID o cliente..."
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 3rem',
                            borderRadius: '30px',
                            border: '1px solid #e5e7eb',
                            outline: 'none',
                            fontSize: '0.95rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '30px',
                        color: '#666',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}>
                        <Filter size={20} />
                        Filtros
                    </button>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '30px',
                        color: '#666',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}>
                        <Calendar size={20} />
                        Fecha
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                overflow: 'hidden'
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #f0f0f0', textAlign: 'left', backgroundColor: '#f9fafb' }}>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>ID Pedido</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Cliente</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Fecha</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Total</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Estado</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem', textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando pedidos...</td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No hay pedidos registrados.</td>
                                </tr>
                            ) : (
                                currentOrders.map((order) => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background-color 0.2s' }} className="hover:bg-gray-50">
                                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: '#333' }}>
                                            {order.id}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    backgroundColor: '#f3f4f6',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#6b7280'
                                                }}>
                                                    <User size={16} />
                                                </div>
                                                <span style={{ color: '#4b5563' }}>{order.customer}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: '#6b7280' }}>
                                            {order.date}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ fontWeight: '600', color: '#1f2937' }}>{order.total}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{order.items} items</div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                fontWeight: '500',
                                                backgroundColor:
                                                    order.status === 'Entregado' ? '#ecfdf5' :
                                                        order.status === 'Pendiente' ? '#fffbeb' :
                                                            (order.status === 'Procesando' || order.status === 'Enviado') ? '#eff6ff' :
                                                                order.status === 'Cancelado' ? '#fef2f2' : '#f3f4f6',
                                                color:
                                                    order.status === 'Entregado' ? '#10b981' :
                                                        order.status === 'Pendiente' ? '#f59e0b' :
                                                            (order.status === 'Procesando' || order.status === 'Enviado') ? '#3b82f6' :
                                                                order.status === 'Cancelado' ? '#ef4444' : '#6b7280',
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                style={{
                                                    padding: '0.5rem',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    color: '#6b7280',
                                                    cursor: 'pointer',
                                                    transition: 'color 0.2s'
                                                }} title="Ver Detalles">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div style={{
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#6b7280',
                    fontSize: '0.9rem'
                }}>
                    <div>Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, orders.length)} de {orders.length} pedidos</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={{
                                padding: '0.5rem 1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                background: currentPage === 1 ? '#f3f4f6' : 'white',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                color: currentPage === 1 ? '#9ca3af' : '#374151'
                            }}
                        >
                            Anterior
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '6px',
                                    background: currentPage === i + 1 ? '#F48646' : 'white',
                                    color: currentPage === i + 1 ? 'white' : '#374151',
                                    cursor: 'pointer'
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '0.5rem 1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                background: currentPage === totalPages ? '#f3f4f6' : 'white',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                color: currentPage === totalPages ? '#9ca3af' : '#374151'
                            }}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            {
                selectedOrder && (
                    <OrderDetailsModal
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                    />
                )
            }
        </div >
    );
};

export default AdminOrders;
