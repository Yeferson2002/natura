import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, trend, icon: Icon, color }) => (
    <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }}>
        <div>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{title}</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem' }}>{value}</h3>
            <span style={{
                fontSize: '0.85rem',
                color: trend.startsWith('+') ? '#10b981' : '#ef4444',
                backgroundColor: trend.startsWith('+') ? '#ecfdf5' : '#fef2f2',
                padding: '0.25rem 0.5rem',
                borderRadius: '20px'
            }}>
                {trend} vs mes anterior
            </span>
        </div>
        <div style={{
            padding: '0.75rem',
            borderRadius: '10px',
            backgroundColor: color + '20',
            color: color
        }}>
            <Icon size={24} />
        </div>
    </div>
);

const AdminDashboard = () => {
    return (
        <div>
            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <StatCard
                    title="Ventas Totales"
                    value="S/ 124,500"
                    trend="+12.5%"
                    icon={DollarSign}
                    color="#F48646"
                />
                <StatCard
                    title="Nuevas Consultoras"
                    value="48"
                    trend="+8.2%"
                    icon={Users}
                    color="#3b82f6"
                />
                <StatCard
                    title="Pedidos Pendientes"
                    value="156"
                    trend="-2.4%"
                    icon={ShoppingBag}
                    color="#f59e0b"
                />
                <StatCard
                    title="Ticket Promedio"
                    value="S/ 345"
                    trend="+5.1%"
                    icon={TrendingUp}
                    color="#10b981"
                />
            </div>

            {/* Recent Activity Section */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', color: '#333' }}>Actividad Reciente</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #f0f0f0', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: '#666', fontWeight: '500', fontSize: '0.9rem' }}>ID Pedido</th>
                            <th style={{ padding: '1rem', color: '#666', fontWeight: '500', fontSize: '0.9rem' }}>Consultora</th>
                            <th style={{ padding: '1rem', color: '#666', fontWeight: '500', fontSize: '0.9rem' }}>Estado</th>
                            <th style={{ padding: '1rem', color: '#666', fontWeight: '500', fontSize: '0.9rem' }}>Monto</th>
                            <th style={{ padding: '1rem', color: '#666', fontWeight: '500', fontSize: '0.9rem' }}>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: '#ORD-001', user: 'Ana García', status: 'Completado', amount: 'S/ 450.00', date: 'Hace 2 horas' },
                            { id: '#ORD-002', user: 'María López', status: 'Pendiente', amount: 'S/ 280.50', date: 'Hace 4 horas' },
                            { id: '#ORD-003', user: 'Carla Ruiz', status: 'En Proceso', amount: 'S/ 890.00', date: 'Hace 5 horas' },
                            { id: '#ORD-004', user: 'Sofia Diaz', status: 'Completado', amount: 'S/ 125.00', date: 'Hace 1 día' },
                        ].map((order, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                <td style={{ padding: '1rem', fontWeight: '500', color: '#333' }}>{order.id}</td>
                                <td style={{ padding: '1rem', color: '#666' }}>{order.user}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        backgroundColor:
                                            order.status === 'Completado' ? '#ecfdf5' :
                                                order.status === 'Pendiente' ? '#fef2f2' : '#fffbeb',
                                        color:
                                            order.status === 'Completado' ? '#10b981' :
                                                order.status === 'Pendiente' ? '#ef4444' : '#f59e0b',
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', fontWeight: '500', color: '#333' }}>{order.amount}</td>
                                <td style={{ padding: '1rem', color: '#999', fontSize: '0.9rem' }}>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
