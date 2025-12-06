import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';

const ClientRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserInfo = sessionStorage.getItem('userInfo');
        if (storedUserInfo) {
            const parsedUser = JSON.parse(storedUserInfo);
            fetchRecommendations(parsedUser);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchRecommendations = async (user) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const clientId = user._id || user.id;
            const response = await fetch(`https://natura-jl7g.onrender.com/api/recommendations/client/${clientId}`, config);

            if (response.ok) {
                const data = await response.json();
                setRecommendations(data);
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Cargando recomendaciones...</div>;
    if (recommendations.length === 0) return <div style={{ padding: '4rem', textAlign: 'center' }}>No tienes recomendaciones pendientes.</div>;

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#666', textDecoration: 'none' }}>
                        <ArrowLeft size={20} />
                        <span style={{ marginLeft: '0.5rem' }}>Volver</span>
                    </Link>
                    <h1 style={{ fontSize: '2rem', fontFamily: 'serif', color: '#333', margin: 0 }}>
                        Tus Recomendaciones Personalizadas
                    </h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {recommendations.map((rec) => (
                        <Link
                            key={rec.id}
                            to={`/product/${rec.Product.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div style={{
                                display: 'flex',
                                backgroundColor: '#fff',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                border: '1px solid #f0f0f0',
                                minHeight: '320px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(244, 134, 70, 0.15)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                                }}
                            >
                                {/* Image Section - Left */}
                                <div style={{
                                    flex: '0 0 45%',
                                    position: 'relative',
                                    backgroundColor: '#f9f9f9'
                                }}>
                                    <img
                                        src={rec.Product.image}
                                        alt={rec.Product.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            padding: '2rem'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '20px',
                                        backgroundColor: '#F48646',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '30px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 4px 10px rgba(244, 134, 70, 0.3)'
                                    }}>
                                        <Sparkles size={16} />
                                        Recomendado Especialmente para Ti
                                    </div>
                                </div>

                                {/* Content Section - Right */}
                                <div style={{
                                    flex: 1,
                                    padding: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #fff8f3 100%)'
                                }}>
                                    <div style={{
                                        fontSize: '0.9rem',
                                        color: '#F48646',
                                        fontWeight: '700',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        marginBottom: '1rem'
                                    }}>
                                        {rec.Product.brand}
                                    </div>

                                    <h3 style={{
                                        fontSize: '2.2rem',
                                        fontWeight: '700',
                                        marginBottom: '1rem',
                                        color: '#1f2937',
                                        fontFamily: 'serif',
                                        lineHeight: '1.2'
                                    }}>
                                        {rec.Product.name}
                                    </h3>

                                    <p style={{
                                        fontSize: '1.1rem',
                                        color: '#6b7280',
                                        marginBottom: '2rem',
                                        lineHeight: '1.6',
                                        maxWidth: '90%'
                                    }}>
                                        {rec.reason ? `"${rec.reason}"` : "Seleccionado por tu consultora pensando en tus gustos. ¡Descubre por qué es perfecto para ti!"}
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.9rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                                                S/ {(rec.Product.price * 1.2).toFixed(2)}
                                            </span>
                                            <span style={{ fontSize: '2rem', fontWeight: '800', color: '#F48646' }}>
                                                S/ {rec.Product.price}
                                            </span>
                                        </div>

                                        <button style={{
                                            padding: '1rem 2rem',
                                            backgroundColor: '#1f2937',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50px',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            transition: 'transform 0.2s',
                                            boxShadow: '0 4px 15px rgba(31, 41, 55, 0.2)'
                                        }}>
                                            Ver Detalles <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientRecommendations;
