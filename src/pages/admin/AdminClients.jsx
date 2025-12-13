import React, { useState, useEffect } from 'react';
import { Search, Filter, User, Edit, Save, X } from 'lucide-react';

const AdminClients = () => {
    const [clients, setClients] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingClient, setEditingClient] = useState(null);
    const [selectedConsultant, setSelectedConsultant] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchClients();
        fetchConsultants();
    }, []);

    const fetchClients = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients`, config);
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchConsultants = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/consultants`, config);
            const data = await response.json();
            setConsultants(data);
        } catch (error) {
            console.error('Error fetching consultants:', error);
        }
    };

    const handleEditClick = (client) => {
        setEditingClient(client.id);
        setSelectedConsultant(client.ConsultantId || '');
    };

    const handleCancelEdit = () => {
        setEditingClient(null);
        setSelectedConsultant('');
    };

    const handleSaveConsultant = async (clientId) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify({ consultantId: selectedConsultant || null }),
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${clientId}/consultant`, config);

            if (response.ok) {
                const updatedClient = await response.json();
                setClients(clients.map(c => c.id === clientId ? updatedClient : c));
                setEditingClient(null);
            } else {
                alert('Error al actualizar la consultora');
            }
        } catch (error) {
            console.error('Error updating client consultant:', error);
            alert('Error al actualizar la consultora');
        }
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClients = clients.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(clients.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Actions Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ position: 'relative', minWidth: '300px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                        type="text"
                        placeholder="Buscar cliente por nombre o email..."
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 3rem',
                            borderRadius: '30px',
                            border: '1px solid #e5e7eb',
                            outline: 'none',
                            fontSize: '0.95rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '30px',
                        color: '#666',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}>
                        <Filter size={20} />
                        Filtros
                    </button>
                </div>
            </div>

            {/* Clients Table */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                overflow: 'hidden'
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #f0f0f0', textAlign: 'left', backgroundColor: '#f9fafb' }}>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Cliente</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Email</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Teléfono</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Consultora Asignada</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem', textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando clientes...</td>
                                </tr>
                            ) : clients.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No hay clientes registrados.</td>
                                </tr>
                            ) : (
                                currentClients.map((client) => (
                                    <tr key={client.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background-color 0.2s' }} className="hover:bg-gray-50">
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    backgroundColor: '#f3f4f6',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#6b7280'
                                                }}>
                                                    <User size={16} />
                                                </div>
                                                <span style={{ color: '#4b5563', fontWeight: '500' }}>{client.firstName} {client.lastName}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: '#6b7280' }}>
                                            {client.email}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: '#6b7280' }}>
                                            {client.phone || '-'}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            {editingClient === client.id ? (
                                                <select
                                                    value={selectedConsultant}
                                                    onChange={(e) => setSelectedConsultant(e.target.value)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        borderRadius: '6px',
                                                        border: '1px solid #d1d5db',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <option value="">Sin asignar</option>
                                                    {consultants.map(consultant => (
                                                        <option key={consultant.id} value={consultant.id}>
                                                            {consultant.firstName} {consultant.lastName}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '20px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '500',
                                                    backgroundColor: client.Consultant ? '#eff6ff' : '#f3f4f6',
                                                    color: client.Consultant ? '#3b82f6' : '#6b7280',
                                                }}>
                                                    {client.Consultant ? `${client.Consultant.firstName} ${client.Consultant.lastName}` : 'Sin asignar'}
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                            {editingClient === client.id ? (
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                    <button
                                                        onClick={() => handleSaveConsultant(client.id)}
                                                        style={{
                                                            padding: '0.5rem',
                                                            borderRadius: '8px',
                                                            border: 'none',
                                                            backgroundColor: '#10b981',
                                                            color: 'white',
                                                            cursor: 'pointer'
                                                        }} title="Guardar">
                                                        <Save size={16} />
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        style={{
                                                            padding: '0.5rem',
                                                            borderRadius: '8px',
                                                            border: 'none',
                                                            backgroundColor: '#ef4444',
                                                            color: 'white',
                                                            cursor: 'pointer'
                                                        }} title="Cancelar">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleEditClick(client)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        borderRadius: '8px',
                                                        border: 'none',
                                                        backgroundColor: 'transparent',
                                                        color: '#6b7280',
                                                        cursor: 'pointer',
                                                        transition: 'color 0.2s'
                                                    }} title="Editar Consultora">
                                                    <Edit size={18} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div style={{
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#6b7280',
                    fontSize: '0.9rem'
                }}>
                    <div>Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, clients.length)} de {clients.length} clientes</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={{
                                padding: '0.5rem 1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                background: currentPage === 1 ? '#f3f4f6' : 'white',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                color: currentPage === 1 ? '#9ca3af' : '#374151'
                            }}
                        >
                            Anterior
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '6px',
                                    background: currentPage === i + 1 ? '#F48646' : 'white',
                                    color: currentPage === i + 1 ? 'white' : '#374151',
                                    cursor: 'pointer'
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '0.5rem 1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                background: currentPage === totalPages ? '#f3f4f6' : 'white',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                color: currentPage === totalPages ? '#9ca3af' : '#374151'
                            }}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminClients;
