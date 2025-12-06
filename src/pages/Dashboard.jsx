import React from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, BookOpen, Leaf } from 'lucide-react';

const Dashboard = () => {
    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Hola, María</h1>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>Consultora Diamante | Ciclo 14</p>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>Ventas del Ciclo</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>S/ 2,450</h3>
                        </div>
                        <TrendingUp color="var(--color-primary)" />
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                        +15% vs ciclo anterior
                    </div>
                </div>

                <Link to="/impact" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card" style={{ borderLeft: '4px solid var(--color-accent)', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>Impacto Generado</p>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1.2 ha</h3>
                            </div>
                            <Leaf color="var(--color-accent)" />
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                            Amazonía preservada
                        </div>
                    </div>
                </Link>

                <div className="card" style={{ borderLeft: '4px solid #333' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>Clientes Activos</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>42</h3>
                        </div>
                        <Users color="#333" />
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-primary)' }}>
                        3 oportunidades hoy
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Herramientas ABA</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

                {/* IA Advisor Card */}
                <div className="card" style={{ background: 'linear-gradient(135deg, #FFF 0%, #FFF8F6 100%)' }}>
                    <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: 'rgba(255, 103, 31, 0.1)', borderRadius: '8px', width: 'fit-content' }}>
                        <Users size={24} color="var(--color-primary)" />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Asesoría Inteligente</h3>
                    <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                        Genera recomendaciones personalizadas para tus clientes usando IA.
                    </p>
                    <Link to="/clients" style={{ width: '100%' }}>
                        <button className="btn btn-primary" style={{ width: '100%' }}>
                            Ver Oportunidades
                        </button>
                    </Link>
                </div>

                {/* Academy Card */}
                <div className="card">
                    <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: 'rgba(120, 160, 46, 0.1)', borderRadius: '8px', width: 'fit-content' }}>
                        <BookOpen size={24} color="var(--color-accent)" />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Academia Natura</h3>
                    <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                        Aprende sobre los nuevos lanzamientos de Chronos y Ekos.
                    </p>
                    <button className="btn btn-outline" style={{ width: '100%' }}>
                        Continuar Aprendiendo
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
