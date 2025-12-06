import React, { useState, useEffect } from 'react';
import { TrendingUp, ShoppingBag, Users, Award, ArrowRight, Calendar, Star } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ConsultantDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cycleSales, setCycleSales] = useState(0);
    const [earnings, setEarnings] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = JSON.parse(sessionStorage.getItem('userInfo'));
                if (storedUser) {
                    setUser(storedUser);

                    // Fetch orders
                    const response = await fetch('https://natura-jl7g.onrender.com/api/orders/myorders', {
                        headers: {
                            Authorization: `Bearer ${storedUser.token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setOrders(data);

                        // Calculate cycle sales (sum of all orders for now)
                        const total = data.reduce((acc, order) => acc + parseFloat(order.totalPrice), 0);
                        setCycleSales(total);

                        // Calculate estimated earnings (30% commission)
                        setEarnings(total * 0.30);
                    }
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Entregado': return { color: '#166534', bg: '#dcfce7' };
            case 'Enviado': return { color: '#1e40af', bg: '#dbeafe' };
            case 'Pendiente': return { color: '#854d0e', bg: '#fef9c3' };
            default: return { color: '#374151', bg: '#f3f4f6' };
        }
    };

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando dashboard...</div>;
    }

    return (
        <div>
            {/* Cycle Progress Card */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                marginBottom: '2rem',
                backgroundImage: 'linear-gradient(to right, #fff, #fff0e6)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1f2937' }}>Progreso del Ciclo 12</h3>
                        <p style={{ margin: '0.5rem 0 0', color: '#666' }}>Te faltan <strong style={{ color: '#F48646' }}>{250} puntos</strong> para subir a nivel Diamante</p>
                    </div>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        color: '#F48646'
                    }}>
                        <Calendar size={16} />
                        Cierra el 05 Dic
                    </div>
                </div>

                <div style={{ position: 'relative', height: '12px', backgroundColor: '#e5e7eb', borderRadius: '6px', marginBottom: '1rem' }}>
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: '75%', // Dynamic width based on points could be implemented here
                        backgroundColor: '#F48646',
                        borderRadius: '6px'
                    }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#666' }}>
                    <span>0 pts</span>
                    <span style={{ fontWeight: 'bold', color: '#333' }}>{user?.points || 750} pts acumulados</span>
                    <span>1000 pts (Diamante)</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate('/consultant/new-order')}
                    style={{
                        backgroundColor: '#F48646',
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(244, 134, 70, 0.3)',
                        transition: 'transform 0.2s'
                    }}
                >
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '50%' }}>
                        <ShoppingBag size={24} />
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Pasar Pedido</span>
                </button>

                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <div style={{ backgroundColor: '#eff6ff', padding: '0.5rem', borderRadius: '8px', color: '#3b82f6' }}>
                            <TrendingUp size={20} />
                        </div>
                        <span style={{ color: '#666', fontWeight: '500' }}>Ventas del Ciclo</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>S/ {cycleSales.toFixed(2)}</div>
                    <div style={{ fontSize: '0.85rem', color: '#10b981', marginTop: '0.25rem' }}>+15% vs Ciclo anterior</div>
                </div>

                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <div style={{ backgroundColor: '#ecfdf5', padding: '0.5rem', borderRadius: '8px', color: '#10b981' }}>
                            <Award size={20} />
                        </div>
                        <span style={{ color: '#666', fontWeight: '500' }}>Ganancia Estimada</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>S/ {earnings.toFixed(2)}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>30% de comisión</div>
                </div>
            </div>

            {/* Recent Orders & Promotions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Recent Orders */}
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1f2937' }}>Pedidos Recientes</h3>
                        <Link to="/consultant/orders" style={{ color: '#F48646', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Ver todos</Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {orders.length > 0 ? (
                            orders.slice(0, 3).map((order) => {
                                const statusStyle = getStatusColor(order.status);
                                return (
                                    <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0' }}>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#333' }}>Pedido #{order.id}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#999' }}>{formatDate(order.createdAt)}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: '600', color: '#333' }}>S/ {order.totalPrice}</div>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '10px',
                                                backgroundColor: statusStyle.bg,
                                                color: statusStyle.color,
                                                fontWeight: '500'
                                            }}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ color: '#666', fontStyle: 'italic' }}>No hay pedidos recientes.</div>
                        )}
                    </div>
                </div>

                {/* Exclusive Promotions */}
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1f2937' }}>Promociones Exclusivas</h3>
                        <Star size={20} color="#F48646" fill="#F48646" />
                    </div>

                    <div style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '180px',
                        borderRadius: '12px',
                        position: 'relative',
                        marginBottom: '1rem',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}></div>
                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '500', opacity: 0.9 }}>Solo por hoy</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Kit Lumina -40%</div>
                        </div>
                    </div>

                    <button style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: 'white',
                        border: '1px solid #F48646',
                        color: '#F48646',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}>
                        Ver todas las ofertas
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultantDashboard;
