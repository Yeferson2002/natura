import React from 'react';
import './Home.css';
import { ChevronLeft, ChevronRight, Headphones } from 'lucide-react';

const Hero = () => {
    return (
        <section className="hero-section" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
            <div style={{
                background: 'linear-gradient(90deg, #5e1c1c 0%, #8a2b2b 100%)',
                minHeight: '450px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                color: 'white'
            }}>
                <div className="container hero-container-inner">

                    {/* Left Content */}
                    <div className="hero-content-left">
                        <h2 className="hero-main-title">
                            Navidad<br />Natura
                        </h2>

                        <div style={{ marginTop: '3rem' }}>
                            <h3 className="hero-sub-title">
                                perfumería con 40%<br />OFF
                            </h3>
                            <p className="hero-description">
                                descubre +60 best sellers y llévate un regalo sorpresa por compras desde S/169
                            </p>
                            <button style={{
                                backgroundColor: 'white',
                                color: '#333',
                                border: 'none',
                                padding: '0.8rem 2rem',
                                borderRadius: '30px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}>
                                quiero mi perfume
                            </button>
                        </div>
                    </div>

                    {/* Right Content (Image Placeholder) */}
                    <div className="hero-image-container">
                        {/* Decorative elements */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            borderRadius: '50% 50% 0 0',
                            transform: 'rotate(-15deg)'
                        }}></div>

                        {/* Product Image Placeholder */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'flex-end'
                        }}>
                            {/* Placeholder for Perfume Bottles */}
                            <div style={{ width: '120px', height: '250px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', backdropFilter: 'blur(5px)' }}></div>
                            <div style={{ width: '150px', height: '180px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', backdropFilter: 'blur(5px)' }}></div>
                            <div style={{ width: '140px', height: '220px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', backdropFilter: 'blur(5px)' }}></div>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button className="hero-nav-btn" style={{
                    position: 'absolute',
                    left: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    zIndex: 10
                }}>
                    <ChevronLeft size={30} />
                </button>
                <button className="hero-nav-btn" style={{
                    position: 'absolute',
                    right: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    zIndex: 10
                }}>
                    <ChevronRight size={30} />
                </button>

                {/* Accessibility Icon */}
                <button style={{
                    position: 'absolute',
                    left: '2rem',
                    bottom: '2rem',
                    background: '#FFD700',
                    border: 'none',
                    borderRadius: '50%',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#333',
                    zIndex: 10
                }}>
                    <Headphones size={24} />
                </button>
            </div>
        </section>
    );
};

export default Hero;
