import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Eye, Filter, CheckCircle } from 'lucide-react';
import AddConsultantModal from '../../components/admin/AddConsultantModal';
import ApprovalSuccessModal from '../../components/admin/ApprovalSuccessModal';

const AdminConsultants = () => {
    const [consultants, setConsultants] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [approvalModalOpen, setApprovalModalOpen] = useState(false);
    const [approvedConsultant, setApprovedConsultant] = useState(null);
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [isViewMode, setIsViewMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const fetchConsultants = async () => {
        try {
            const response = await fetch('https://natura-jl7g.onrender.com/api/users/consultants');
            const data = await response.json();

            // Transform data to match UI needs
            const transformedData = data.map(user => ({
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                level: user.consultantLevel,
                sales: `S/ ${parseFloat(user.monthlySales).toLocaleString('es-PE', { minimumFractionDigits: 2 })}`,
                clientCount: user.clientCount || 0,
                status: user.status,
                initials: `${user.firstName[0]}${user.lastName[0]}`,
                color: getRandomColor() // Or deterministic based on id
            }));

            setConsultants(transformedData);
        } catch (error) {
            console.error('Error fetching consultants:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConsultants();
    }, []);

    const getRandomColor = () => {
        const colors = ['#F48646', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleConsultantAdded = (newConsultant) => {
        fetchConsultants(); // Refresh list
    };

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`https://natura-jl7g.onrender.com/api/users/${id}/approve`, {
                method: 'PUT'
            });
            const data = await response.json();

            if (response.ok) {
                setApprovedConsultant(data);
                setApprovalModalOpen(true);
                fetchConsultants(); // Refresh list to show active status
            } else {
                alert('Error al aprobar consultora');
            }
        } catch (error) {
            console.error('Error approving consultant:', error);
            alert('Error de conexión');
        }
    };

    const handleView = async (id) => {
        try {
            const response = await fetch(`https://natura-jl7g.onrender.com/api/users/${id}`);
            const data = await response.json();
            if (response.ok) {
                setSelectedConsultant(data);
                setIsViewMode(true);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching consultant details:', error);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await fetch(`https://natura-jl7g.onrender.com/api/users/${id}`);
            const data = await response.json();
            if (response.ok) {
                setSelectedConsultant(data);
                setIsViewMode(false);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching consultant details:', error);
        }
    };

    const handleAddNew = () => {
        setSelectedConsultant(null);
        setIsViewMode(false);
        setIsModalOpen(true);
    };

    const getLevelColor = (level) => {
        switch (level) {
            case 'Bronce': return '#cd7f32';
            case 'Plata': return '#9ca3af';
            case 'Oro': return '#fbbf24';
            case 'Diamante': return '#8b5cf6';
            default: return '#6b7280';
        }
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentConsultants = consultants.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(consultants.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <AddConsultantModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConsultantAdded={handleConsultantAdded}
                initialData={selectedConsultant}
                isViewMode={isViewMode}
            />

            <ApprovalSuccessModal
                isOpen={approvalModalOpen}
                onClose={() => setApprovalModalOpen(false)}
                consultant={approvedConsultant}
            />

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
                        placeholder="Buscar consultora..."
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
                    <button
                        onClick={handleAddNew}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#F48646',
                            border: 'none',
                            borderRadius: '30px',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 10px rgba(244, 134, 70, 0.3)'
                        }}
                    >
                        <Plus size={20} />
                        Nueva Consultora
                    </button>
                </div>
            </div>

            {/* Consultants Table */}
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
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Consultora</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Nivel</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Ventas (Mes)</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Clientes</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem' }}>Estado</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#666', fontWeight: '600', fontSize: '0.9rem', textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando consultoras...</td>
                                </tr>
                            ) : consultants.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No se encontraron consultoras.</td>
                                </tr>
                            ) : (
                                currentConsultants.map((consultant) => (
                                    <tr key={consultant.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background-color 0.2s' }} className="hover:bg-gray-50">
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    backgroundColor: consultant.color + '20',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 'bold',
                                                    color: consultant.color
                                                }}>
                                                    {consultant.initials}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>{consultant.name}</div>
                                                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{consultant.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                fontWeight: '500',
                                                backgroundColor: getLevelColor(consultant.level) + '20',
                                                color: getLevelColor(consultant.level)
                                            }}>
                                                {consultant.level}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '500', color: '#333' }}>
                                            {consultant.sales}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '500', color: '#333' }}>
                                            {consultant.clientCount}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                fontWeight: '500',
                                                backgroundColor:
                                                    consultant.status === 'Activa' ? '#ecfdf5' :
                                                        consultant.status === 'Inactiva' ? '#fef2f2' : '#fffbeb',
                                                color:
                                                    consultant.status === 'Activa' ? '#10b981' :
                                                        consultant.status === 'Inactiva' ? '#ef4444' : '#f59e0b',
                                            }}>
                                                {consultant.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                {consultant.status === 'Pendiente' ? (
                                                    <button
                                                        onClick={() => handleApprove(consultant.id)}
                                                        style={{
                                                            padding: '0.5rem',
                                                            borderRadius: '8px',
                                                            border: 'none',
                                                            backgroundColor: '#d1fae5',
                                                            color: '#059669',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.2s',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.25rem',
                                                            fontWeight: '600',
                                                            fontSize: '0.8rem'
                                                        }}
                                                        title="Aprobar Consultora"
                                                    >
                                                        <CheckCircle size={16} /> Aprobar
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleView(consultant.id)}
                                                            style={{
                                                                padding: '0.5rem',
                                                                borderRadius: '8px',
                                                                border: 'none',
                                                                backgroundColor: 'transparent',
                                                                color: '#6b7280',
                                                                cursor: 'pointer',
                                                                transition: 'color 0.2s'
                                                            }} title="Ver Perfil">
                                                            <Eye size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(consultant.id)}
                                                            style={{
                                                                padding: '0.5rem',
                                                                borderRadius: '8px',
                                                                border: 'none',
                                                                backgroundColor: 'transparent',
                                                                color: '#3b82f6',
                                                                cursor: 'pointer',
                                                                transition: 'color 0.2s'
                                                            }} title="Editar">
                                                            <Edit size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
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
                    <div>Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, consultants.length)} de {consultants.length} consultoras</div>
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

export default AdminConsultants;
