import React, { useState, useEffect } from 'react';
import { Search, Filter, Share2, ExternalLink } from 'lucide-react';

const ConsultantCatalog = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            const response = await fetch('https://natura-jl7g.onrender.com/api/recommendations/consultant', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setRecommendations(data);
            } else {
                console.error('Failed to fetch recommendations');
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShareWhatsApp = (rec) => {
        const message = `Hola ${rec.Client.firstName}, te recomiendo este producto que creo que te encantará: ${rec.Product.name} - S/ ${rec.Product.price}. ${rec.reason ? `Motivo: ${rec.reason}` : ''}`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const filteredRecommendations = recommendations.filter(rec =>
        rec.Product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.Client.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>Mis Recomendaciones</h1>
                <p style={{ color: '#6b7280' }}>Gestiona y comparte tus recomendaciones personalizadas.</p>
            </div>

            {/* Filters */}
            <div style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
            }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                        type="text"
                        placeholder="Buscar por producto o cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 3rem',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando recomendaciones...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filteredRecommendations.map((rec) => (
                        <div key={rec.id} style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e5e7eb',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ position: 'relative', height: '200px' }}>
                                <img
                                    src={rec.Product.image}
                                    alt={rec.Product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: '#F48646'
                                }}>
                                    S/ {rec.Product.price}
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>{rec.Product.name}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Recomendado a: <span style={{ fontWeight: '600', color: '#374151' }}>{rec.Client.firstName} {rec.Client.lastName}</span></p>
                                </div>

                                {rec.reason && (
                                    <div style={{
                                        backgroundColor: '#fff7ed',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        color: '#9a3412',
                                        marginBottom: '1.5rem',
                                        flex: 1
                                    }}>
                                        "{rec.reason}"
                                    </div>
                                )}

                                <button
                                    onClick={() => handleShareWhatsApp(rec)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        backgroundColor: '#25D366',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        transition: 'background-color 0.2s'
                                    }}
                                >
                                    <Share2 size={18} />
                                    Compartir en WhatsApp
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConsultantCatalog;
