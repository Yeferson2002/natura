import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, padding: '2rem 0' }}>
                <div className="container">
                    <Outlet />
                </div>
            </main>

            {/* Footer Simple */}
            <footer style={{ backgroundColor: '#333', color: 'white', padding: '2rem 0', marginTop: 'auto' }}>
                <div className="container" style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                    <p>© 2024 Natura &Co. Plataforma ABA (Prototipo MVP).</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
