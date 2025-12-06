import React, { useState, useEffect } from 'react';
import { Search, User, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import ClientOrdersModal from '../../components/consultant/ClientOrdersModal';

const ConsultantCustomers = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const response = await fetch('https://natura-jl7g.onrender.com/api/clients', config);
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredClients = clients.filter(client =>
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClientClick = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedClient(null);
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem' }}>Mis Clientes</h2>
                <p style={{ color: '#666' }}>Gestiona y visualiza la información de tus clientes asignados.</p>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '2rem', position: 'relative', maxWidth: '500px' }}>
                <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input
                    type="text"
                    placeholder="Buscar cliente por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 3rem',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        outline: 'none',
                        fontSize: '0.95rem',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                    }}
                />
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>Cargando clientes...</div>
            ) : filteredClients.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <User size={48} color="#e5e7eb" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>No se encontraron clientes</h3>
                    <p style={{ color: '#9ca3af' }}>{searchTerm ? 'Intenta con otra búsqueda.' : 'Aún no tienes clientes asignados.'}</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filteredClients.map(client => (
                        <div key={client.id} style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer'
                        }}
                            onClick={() => handleClientClick(client)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: '#fff0e6',
                                    color: '#F48646',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold'
                                }}>
                                    {client.firstName.charAt(0)}{client.lastName.charAt(0)}
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1f2937' }}>{client.firstName} {client.lastName}</h3>
                                    <span style={{ fontSize: '0.85rem', color: '#666' }}>Cliente Frecuente</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4b5563', fontSize: '0.9rem' }}>
                                    <Mail size={18} color="#9ca3af" />
                                    {client.email}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4b5563', fontSize: '0.9rem' }}>
                                    <Phone size={18} color="#9ca3af" />
                                    {client.phone || 'No registrado'}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4b5563', fontSize: '0.9rem' }}>
                                    <Calendar size={18} color="#9ca3af" />
                                    Registrado: {new Date(client.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                <button style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    backgroundColor: 'white',
                                    color: '#374151',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.9rem'
                                }}>
                                    <Mail size={16} />
                                    Email
                                </button>
                                <button style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    backgroundColor: 'white',
                                    color: '#374151',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.9rem'
                                }}>
                                    <Phone size={16} />
                                    Llamar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ClientOrdersModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                client={selectedClient}
            />
        </div>
    );
};

export default ConsultantCustomers;
