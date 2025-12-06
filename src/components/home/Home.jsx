import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import CategorySection from './CategorySection';
import GiftSection from './GiftSection';
import RecommendedSection from './RecommendedSection';

const Home = () => {
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <Hero />

            {/* Spacing */}
            <div style={{ height: '2rem' }}></div>

            <RecommendedSection />
            <CategorySection />
            <GiftSection />

            {/* Additional Promo Section - Consultancy */}
            <section className="promo-section">
                <div className="container promo-container">
                    <div className="promo-text">
                        <h2 className="promo-title">Únete a nuestra red de consultoría</h2>
                        <p className="promo-description">
                            Transforma tu vida y la de los demás con productos que cuidan de ti y del planeta.
                            Obtén ganancias ilimitadas y flexibilidad de horario.
                        </p>
                        <Link to="/consultora">
                            <button className="btn-promo">
                                Quiero ser Consultora
                            </button>
                        </Link>
                    </div>
                    <div className="promo-image">
                        <div className="promo-bg">
                            <div className="promo-overlay"></div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
