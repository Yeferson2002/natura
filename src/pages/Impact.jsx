import React from 'react';
import { Leaf, Droplets, Wind, Heart } from 'lucide-react';

const Impact = () => {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Mi Impacto Positivo</h1>
                <p style={{ color: 'var(--color-text-light)' }}>
                    Tus ventas no solo generan ganancias, también regeneran el mundo.
                </p>
            </div>

            {/* Hero Impact Card */}
            <div className="card" style={{ backgroundColor: 'var(--color-accent)', color: 'white', marginBottom: '2rem', border: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Leaf size={32} color="white" />
                    <h2 style={{ fontSize: '1.5rem' }}>1.2 Hectáreas de Amazonía</h2>
                </div>
                <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                    Gracias a tus ventas de la línea Ekos este año, has contribuido a conservar un área equivalente a 1.5 canchas de fútbol en la selva amazónica.
                </p>
            </div>

            {/* Detailed Metrics */}
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Desglose de tu Aporte</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.5rem', backgroundColor: '#E3F2FD', borderRadius: '8px' }}>
                            <Droplets size={20} color="#2196F3" />
                        </div>
                        <h4 style={{ fontWeight: 'bold' }}>Agua Ahorrada</h4>
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>2,500 L</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                        Equivalente a 50 duchas de 5 minutos.
                    </p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.5rem', backgroundColor: '#F3E5F5', borderRadius: '8px' }}>
                            <Wind size={20} color="#9C27B0" />
                        </div>
                        <h4 style={{ fontWeight: 'bold' }}>Carbono Evitado</h4>
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>150 kg</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                        Mediante el uso de repuestos y envases eco-eficientes.
                    </p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.5rem', backgroundColor: '#FFEBEE', borderRadius: '8px' }}>
                            <Heart size={20} color="#E91E63" />
                        </div>
                        <h4 style={{ fontWeight: 'bold' }}>Inversión Social</h4>
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>S/ 340</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                        Destinados a proyectos de educación en Perú (Creer para Ver).
                    </p>
                </div>

            </div>

            {/* Call to Action */}
            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#666' }}>
                    "El mundo es más bonito contigo."
                </p>
                <button className="btn btn-outline">
                    Compartir mi Certificado de Impacto
                </button>
            </div>
        </div>
    );
};

export default Impact;
