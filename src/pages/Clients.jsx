import React, { useState } from 'react';
import { Search, Sparkles, ChevronRight } from 'lucide-react';
import { clients, generateRecommendation } from '../data/mockData';
import RecommendationModal from '../components/RecommendationModal';

const Clients = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAnalyze = (client) => {
        setSelectedClient(client);
        // Simulate AI processing delay
        setTimeout(() => {
            const rec = generateRecommendation(client);
            setRecommendation(rec);
            setIsModalOpen(true);
        }, 800);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Mis Clientes</h1>
                <button className="btn btn-primary">
                    + Nuevo Cliente
                </button>
            </div>

            {/* Search Filter */}
            <div style={{ marginBottom: '2rem', position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)'
                    }}
                />
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            </div>

            {/* Clients List */}
            <div style={{ display: 'grid', gap: '1rem' }}>
                {clients.map(client => (
                    <div key={client.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                        <img
                            src={client.avatar}
                            alt={client.name}
                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                        />

                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{client.name}</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                                Última compra: {client.lastPurchase}
                            </p>
                        </div>

                        <div style={{ textAlign: 'right', marginRight: '1rem', display: 'none', '@media (min-width: 600px)': { display: 'block' } }}>
                            <span style={{ fontSize: '0.75rem', backgroundColor: '#E0F2F1', color: '#00695C', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                Potencial {client.potential}
                            </span>
                        </div>

                        <button
                            onClick={() => handleAnalyze(client)}
                            className="btn btn-outline"
                            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', gap: '0.5rem' }}
                        >
                            <Sparkles size={16} />
                            <span style={{ display: 'none', '@media (min-width: 400px)': { display: 'inline' } }}>Analizar</span>
                        </button>
                    </div>
                ))}
            </div>

            <RecommendationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                client={selectedClient}
                recommendation={recommendation}
            />
        </div>
    );
};

export default Clients;
