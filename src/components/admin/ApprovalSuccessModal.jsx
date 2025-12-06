import React from 'react';
import { X, MessageCircle, Copy, CheckCircle } from 'lucide-react';

const ApprovalSuccessModal = ({ isOpen, onClose, consultant }) => {
    if (!isOpen || !consultant) return null;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here
    };

    const message = `Hola ${consultant.firstName}, tu solicitud ha sido aprobada. 
Tus credenciales de acceso son:
Usuario: ${consultant.email}
Contraseña: ${consultant.generatedPassword}
Ingresa aquí: http://localhost:5173/professional-login`;

    const whatsappUrl = `https://wa.me/51${consultant.phone || ''}?text=${encodeURIComponent(message)}`;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                width: '90%',
                maxWidth: '500px',
                padding: '2rem',
                position: 'relative',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                >
                    <X size={24} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#d1fae5',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        color: '#10b981'
                    }}>
                        <CheckCircle size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '0.5rem' }}>¡Consultora Aprobada!</h2>
                    <p style={{ color: '#666' }}>La cuenta ha sido activada exitosamente.</p>
                </div>

                <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>Usuario / Correo</label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', color: '#333' }}>
                            {consultant.email}
                            <button onClick={() => handleCopy(consultant.email)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>Contraseña Generada</label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', color: '#333' }}>
                            {consultant.generatedPassword}
                            <button onClick={() => handleCopy(consultant.generatedPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: '#25D366',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)'
                    }}
                >
                    <MessageCircle size={20} />
                    Enviar Credenciales por WhatsApp
                </a>
            </div>
        </div>
    );
};

export default ApprovalSuccessModal;
