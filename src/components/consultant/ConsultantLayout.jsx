import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, User, LogOut, Menu, X, PlusCircle, BookOpen } from 'lucide-react';
import '../admin/AdminLayout.css'; // Reusing Admin styles for consistency

const ConsultantLayout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isActive = (path) => location.pathname === path;

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);


    const [user, setUser] = useState(null);

    React.useEffect(() => {
        const storedUser = sessionStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
    };

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
                        natura <span style={{ fontSize: '0.8rem', color: '#F48646', fontFamily: 'sans-serif', fontWeight: 'bold' }}>CONSULTORA</span>
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

                <div style={{ padding: '1.5rem 1.5rem 0.5rem' }}>
                    <div style={{
                        backgroundColor: '#fff0e6',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Nivel Actual</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#F48646', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {user?.consultantLevel || 'Bronce'} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#333' }}>★</span>
                        </div>
                        <div style={{ marginTop: '0.5rem', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: '75%', height: '100%', backgroundColor: '#F48646' }}></div>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Faltan 250 pts para Diamante</div>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '0 1.5rem 1.5rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>
                            <Link to="/consultant/dashboard" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/consultant/dashboard') ? '#F48646' : '#666',
                                backgroundColor: isActive('/consultant/dashboard') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/consultant/dashboard') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <LayoutDashboard size={20} />
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/consultant/new-order" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/consultant/new-order') ? '#F48646' : '#666',
                                backgroundColor: isActive('/consultant/new-order') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/consultant/new-order') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <PlusCircle size={20} />
                                Nuevo Pedido
                            </Link>
                        </li>
                        <li>
                            <Link to="/consultant/orders" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/consultant/orders') ? '#F48646' : '#666',
                                backgroundColor: isActive('/consultant/orders') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/consultant/orders') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <ShoppingBag size={20} />
                                Mis Pedidos
                            </Link>
                        </li>
                        <li>
                            <Link to="/consultant/customers" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/consultant/customers') ? '#F48646' : '#666',
                                backgroundColor: isActive('/consultant/customers') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/consultant/customers') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <Users size={20} />
                                Mis Clientes
                            </Link>
                        </li>
                        <li>
                            <Link to="/consultant/catalog" onClick={closeSidebar} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/consultant/catalog') ? '#F48646' : '#666',
                                backgroundColor: isActive('/consultant/catalog') ? '#fff0e6' : 'transparent',
                                fontWeight: isActive('/consultant/catalog') ? '600' : '400',
                                transition: 'all 0.2s'
                            }}>
                                <BookOpen size={20} />
                                Mis Recomendaciones
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
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: '#1f2937', fontWeight: '600', margin: 0 }}>
                                Hola, {user?.firstName || 'Consultora'}
                            </h2>
                            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Ciclo 12 • Cierra en 5 días</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="desktop-only-user" style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '600', color: '#333' }}>{user?.firstName} {user?.lastName}</div>
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Consultora {user?.consultantLevel || 'Bronce'}</div>
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
                            {getInitials(user?.firstName, user?.lastName)}
                        </div>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    );
};

export default ConsultantLayout;
