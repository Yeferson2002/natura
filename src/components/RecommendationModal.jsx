import React from 'react';
import { X, MessageCircle, Copy, Check } from 'lucide-react';

const RecommendationModal = ({ isOpen, onClose, client, recommendation }) => {
    const [copied, setCopied] = React.useState(false);

    if (!isOpen || !recommendation) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(recommendation.script);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleWhatsApp = () => {
        const text = encodeURIComponent(recommendation.script);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div className="card" style={{ width: '90%', maxWidth: '500px', padding: '0', overflow: 'hidden', animation: 'slideUp 0.3s ease-out' }}>

                {/* Header */}
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-bg-main)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Recomendación ABA</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>

                    {/* Product Showcase */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Placeholder for image if real URL fails */}
                            <span style={{ fontSize: '0.7rem', color: '#999' }}>Producto</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 'bold' }}>
                                {recommendation.product.brand} • {recommendation.product.line}
                            </span>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.25rem 0' }}>{recommendation.product.name}</h4>
                            <p style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>S/ {recommendation.product.price.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* AI Script */}
                    <div style={{ backgroundColor: '#FFF8F6', padding: '1rem', borderRadius: '8px', border: '1px solid #FFDcc6', marginBottom: '1.5rem' }}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            ✨ Guion Sugerido por IA
                        </p>
                        <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#555' }}>
                            "{recommendation.script}"
                        </p>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={handleCopy}
                            className="btn btn-outline"
                            style={{ flex: 1, display: 'flex', gap: '0.5rem' }}
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                            {copied ? 'Copiado' : 'Copiar'}
                        </button>
                        <button
                            onClick={handleWhatsApp}
                            className="btn btn-primary"
                            style={{ flex: 1, display: 'flex', gap: '0.5rem', backgroundColor: '#25D366' }} // WhatsApp Green
                        >
                            <MessageCircle size={18} />
                            WhatsApp
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RecommendationModal;
