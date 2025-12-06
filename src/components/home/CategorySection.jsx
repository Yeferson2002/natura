import React from 'react';
import { Sparkles, Heart, Wind, Palette, Smile, Gift, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const categories = [
    { id: 1, name: 'perfumería', icon: Sparkles, path: '/perfumeria' },
    { id: 2, name: 'cuidados diarios', icon: Heart, path: '/category/cuidados-diarios' },
    { id: 3, name: 'cabello', icon: Wind, path: '/category/cabello' },
    { id: 4, name: 'maquillaje', icon: Palette, path: '/category/maquillaje' },
    { id: 5, name: 'rostro', icon: Smile, path: '/category/rostro' },
    { id: 6, name: 'regalos', icon: Gift, path: '/category/regalos' },
    { id: 7, name: 'casa', icon: HomeIcon, path: '/category/casa' },
];

const CategorySection = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (path) => {
        if (path) {
            navigate(path);
        }
    };

    return (
        <section className="category-section container" style={{ padding: '3rem 1rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#333' }}>encuentra la categoría perfecta para ti</h2>
            <div className="category-list" style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                paddingBottom: '1rem',
                scrollbarWidth: 'none'
            }}>
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="category-pill"
                        onClick={() => handleCategoryClick(cat.path)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            padding: '0.8rem 1.5rem',
                            backgroundColor: 'white',
                            borderRadius: '30px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.3s ease',
                            border: '1px solid transparent',
                            color: '#333'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F48646';
                            e.currentTarget.style.color = 'white';
                            const icon = e.currentTarget.querySelector('.category-icon');
                            if (icon) {
                                icon.style.color = 'white';
                                icon.style.stroke = 'white'; // Ensure stroke changes for SVG
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#333';
                            const icon = e.currentTarget.querySelector('.category-icon');
                            if (icon) {
                                icon.style.color = '#F48646';
                                icon.style.stroke = '#F48646'; // Revert stroke
                            }
                        }}
                    >
                        {cat.name === 'perfumería' ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#F48646"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-sparkles category-icon"
                                aria-hidden="true"
                                style={{ color: '#F48646', transition: 'all 0.3s ease' }}
                            >
                                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                                <path d="M20 2v4"></path>
                                <path d="M22 4h-4"></path>
                                <circle cx="4" cy="20" r="2"></circle>
                            </svg>
                        ) : (
                            <cat.icon className="category-icon" size={20} color="#F48646" style={{ transition: 'all 0.3s ease' }} />
                        )}
                        <span className="category-name" style={{ fontWeight: '600', fontSize: '0.95rem' }}>{cat.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
