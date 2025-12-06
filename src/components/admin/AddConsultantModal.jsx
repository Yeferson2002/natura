import React, { useState, useEffect } from 'react';
import { X, Upload, User, Mail, Phone, FileText, Award, Activity } from 'lucide-react';

const AddConsultantModal = ({ isOpen, onClose, onConsultantAdded, initialData = null, isViewMode = false }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dni: '',
        phone: '',
        consultantLevel: 'Bronce',
        status: 'Pendiente'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                email: initialData.email || '',
                dni: initialData.dni || '',
                phone: initialData.phone || '',
                consultantLevel: initialData.consultantLevel || 'Bronce',
                status: initialData.status || 'Pendiente'
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                dni: '',
                phone: '',
                consultantLevel: 'Bronce',
                status: 'Pendiente'
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const url = initialData
                ? `https://natura-jl7g.onrender.com/api/users/${initialData.id}`
                : 'https://natura-jl7g.onrender.com/api/users/consultants';

            const method = initialData ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al guardar consultora');
            }

            onConsultantAdded(data);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
                maxWidth: '600px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                        {isViewMode ? 'Detalles de Consultora' : initialData ? 'Editar Consultora' : 'Nueva Consultora'}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                    {error && (
                        <div style={{
                            backgroundColor: '#fee2e2',
                            border: '1px solid #ef4444',
                            color: '#b91c1c',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Nombres
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={isViewMode}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                                        borderRadius: '8px',
                                        border: '1px solid #d1d5db',
                                        outline: 'none',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Apellidos
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={isViewMode}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                                        borderRadius: '8px',
                                        border: '1px solid #d1d5db',
                                        outline: 'none',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                DNI
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FileText size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input
                                    type="text"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    disabled={isViewMode}
                                    required
                                    maxLength="8"
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                                        borderRadius: '8px',
                                        border: '1px solid #d1d5db',
                                        outline: 'none',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Teléfono
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={isViewMode}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                                        borderRadius: '8px',
                                        border: '1px solid #d1d5db',
                                        outline: 'none',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                            Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isViewMode}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    fontSize: '0.95rem'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Nivel
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Award size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <select
                                    name="consultantLevel"
                                    value={formData.consultantLevel}
                                    onChange={handleChange}
                                    disabled={isViewMode}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                                        borderRadius: '8px',
                                        border: '1px solid #d1d5db',
                                        outline: 'none',
                                        fontSize: '0.95rem',
                                        backgroundColor: isViewMode ? '#f3f4f6' : 'white'
                                    }}
                                >
                                    <option value="Bronce">Bronce</option>
                                    <option value="Plata">Plata</option>
                                    <option value="Oro">Oro</option>
                                    <option value="Diamante">Diamante</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Estado
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Activity size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    disabled={isViewMode}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                                        borderRadius: '8px',
                                        border: '1px solid #d1d5db',
                                        outline: 'none',
                                        fontSize: '0.95rem',
                                        backgroundColor: isViewMode ? '#f3f4f6' : 'white'
                                    }}
                                >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Activa">Activa</option>
                                    <option value="Inactiva">Inactiva</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {!isViewMode && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button
                                type="button"
                                onClick={onClose}
                                style={{
                                    padding: '0.625rem 1.25rem',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    backgroundColor: 'white',
                                    color: '#374151',
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    padding: '0.625rem 1.25rem',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: '#F48646',
                                    color: 'white',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontWeight: '500',
                                    opacity: loading ? 0.7 : 1
                                }}
                            >
                                {loading ? 'Guardando...' : (initialData ? 'Actualizar' : 'Guardar')}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddConsultantModal;
