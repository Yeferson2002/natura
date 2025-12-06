import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

const RecommendedSection = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUserInfo = sessionStorage.getItem('userInfo');
        if (storedUserInfo) {
            const parsedUser = JSON.parse(storedUserInfo);
            setUserInfo(parsedUser);
            // Only fetch if user is a client (assuming role check or just try fetching)
            // Ideally we should check if parsedUser.role === 'client' but for now let's try fetching
            fetchRecommendations(parsedUser);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchRecommendations = async (user) => {
        try {
            // We need the client ID. Assuming the user object has it or we use the user ID.
            // If the user is a client, their ID in the Clients table might be different from Users table 
            // if they are separate tables. 
            // Based on previous context, Clients are separate. 
            // However, the auth flow might store the Client ID in userInfo.
            // Let's assume userInfo.id is the Client ID for now or we need a way to get it.
            // If the login returns the Client object, then userInfo.id is correct.

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            // We need to know the Client ID. 
            // The auth controller returns the ID as '_id'
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

    if (loading || recommendations.length === 0) return null;

    // Get the latest recommendation
    const latestRec = recommendations[0];

    return (
        <Link
            to="/recommendations"
            style={{ textDecoration: 'none' }}
        >
            <div style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                zIndex: 1000,
                maxWidth: '350px',
                border: '1px solid #f0f0f0',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                }}
            >
                <div style={{ position: 'relative' }}>
                    <img
                        src={latestRec.Product.image}
                        alt={latestRec.Product.name}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                            border: '1px solid #eee'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        backgroundColor: '#F48646',
                        borderRadius: '50%',
                        width: '12px',
                        height: '12px',
                        border: '2px solid white'
                    }}></div>
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: '0.75rem',
                        color: '#F48646',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        marginBottom: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <Sparkles size={12} />
                        Recomendado para ti
                    </div>
                    <h4 style={{
                        margin: 0,
                        fontSize: '0.95rem',
                        color: '#333',
                        fontWeight: '600',
                        lineHeight: '1.3',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {latestRec.Product.name}
                    </h4>
                </div>
            </div>
        </Link>
    );
};

export default RecommendedSection;
