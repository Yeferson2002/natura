import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingCart, Settings, LogOut, Menu, X } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isActive = (path) => location.pathname === path;

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="admin-container">
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
                onClick={closeSidebar}
            ></div>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div style={{ padding: '2rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontFamily: 'serif', color: '#333' }}>
                        natura <span style={{ fontSize: '0.8rem', color: '#F48646', fontFamily: 'sans-serif', fontWeight: 'bold' }}>ADMIN</span>
                    </div>
                    <button
                        onClick={closeSidebar}
                        className="mobile-close-btn"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#666'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav style={{ flex: 1, padding: '1.5rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>
                            <Link to="/admin/dashboard" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/admin/dashboard') ? '#F48646' : '#666',
                                backgroundColor: isActive('/admin/dashboard') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/admin/dashboard') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <LayoutDashboard size={20} />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/products" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/admin/products') ? '#F48646' : '#666',
                                backgroundColor: isActive('/admin/products') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/admin/products') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <Package size={20} />
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/consultants" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/admin/consultants') ? '#F48646' : '#666',
                                backgroundColor: isActive('/admin/consultants') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/admin/consultants') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <Users size={20} />
                                Consultoras
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/orders" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/admin/orders') ? '#F48646' : '#666',
                                backgroundColor: isActive('/admin/orders') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/admin/orders') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <ShoppingCart size={20} />
                                Pedidos
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/clients" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/admin/clients') ? '#F48646' : '#666',
                                backgroundColor: isActive('/admin/clients') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/admin/clients') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <Users size={20} />
                                Clientes
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/settings" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/admin/settings') ? '#F48646' : '#666',
                                backgroundColor: isActive('/admin/settings') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/admin/settings') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <Settings size={20} />
                                Configuración
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid #f0f0f0' }}>
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#ef4444',
                        fontWeight: '500',
                        transition: 'all 0.2s'
                    }}>
                        <LogOut size={20} />
                        Cerrar Sesión
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button className="mobile-menu-btn" onClick={toggleSidebar}>
                            <Menu size={24} />
                        </button>
                        <h2 style={{ fontSize: '1.5rem', color: '#1f2937', fontWeight: '600', margin: 0 }}>
                            {location.pathname.includes('dashboard') ? 'Resumen General' :
                                location.pathname.includes('products') ? 'Gestión de Productos' :
                                    location.pathname.includes('consultants') ? 'Red de Consultoras' :
                                        location.pathname.includes('orders') ? 'Pedidos Recientes' : 'Panel de Administración'}
                        </h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="desktop-only-user" style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '600', color: '#333' }}>Admin User</div>
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Administrador General</div>
                        </div>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#F48646',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                        }}>
                            AU
                        </div>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
