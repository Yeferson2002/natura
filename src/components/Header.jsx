import React from 'react';
import { Search, User, ShoppingBag, Menu, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header style={{ backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 100, fontFamily: 'sans-serif' }}>
            {/* Main Header */}
            <div className="container" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem' }}>

                {/* Logo & Menu */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: '400', color: 'var(--color-text-main)', letterSpacing: '-0.5px', fontFamily: 'serif' }}>
                            natura
                        </div>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="search-container-responsive">
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            type="text"
                            placeholder="¿qué buscas hoy?"
                            style={{
                                width: '100%',
                                padding: '0.8rem 3.5rem 0.8rem 1.5rem',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                backgroundColor: '#f4f4f4',
                                fontSize: '0.95rem',
                                color: '#666'
                            }}
                        />
                        <button style={{
                            position: 'absolute',
                            right: '0.25rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: '#F48646',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white'
                        }}>
                            <Search size={20} />
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#666', cursor: 'pointer' }}>
                        <Heart size={20} />
                        <span className="desktop-only">favoritos</span>
                    </div>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#666', cursor: 'pointer' }}>
                            <User size={20} />
                            <span className="desktop-only">Mi cuenta</span>
                        </div>
                    </Link>
                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                        <ShoppingBag size={24} color="#666" />
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            backgroundColor: '#F48646',
                            color: 'white',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>1</span>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', padding: '0.8rem 1rem', gap: '1.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#333', whiteSpace: 'nowrap' }}>
                    <span style={{ backgroundColor: '#F48646', color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.85rem' }}>Especial perfu</span>
                    <span style={{ cursor: 'pointer' }}>Regala Natura</span>
                    <span style={{ cursor: 'pointer' }}>Promociones</span>
                    <Link to="/perfumeria" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span style={{ cursor: 'pointer' }}>Perfumería</span>
                    </Link>
                    <span style={{ cursor: 'pointer' }}>Rostro</span>
                    <span style={{ cursor: 'pointer' }}>Cabello</span>
                    <span style={{ cursor: 'pointer' }}>Cuerpo</span>
                    <span style={{ cursor: 'pointer' }}>Maquillaje</span>
                    <span style={{ cursor: 'pointer' }}>Regalos</span>
                    <span style={{ cursor: 'pointer' }}>Casa</span>
                </div>
            </div>
        </header >
    );
};

export default Header;
