import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Consultant = () => {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        dni: '',
        phone: '',
        email: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('https://natura-jl7g.onrender.com/api/users/consultants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: '¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.' });
                setFormData({ firstName: '', lastName: '', dni: '', phone: '', email: '' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Error al enviar la solicitud.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error de conexión. Inténtalo de nuevo.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#fff' }}>
            {/* Hero Section */}
            <div style={{
                position: 'relative',
                height: '500px',
                backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)'
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1, color: 'white' }}>
                    <h1 style={{ fontSize: '3.5rem', fontFamily: 'serif', marginBottom: '1rem', maxWidth: '600px' }}>
                        Transforma tu vida y la de los demás
                    </h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '500px', marginBottom: '2rem' }}>
                        Únete a nuestra red de consultoría y descubre un mundo de oportunidades, ganancias y crecimiento personal.
                    </p>
                    <button style={{
                        padding: '1rem 2.5rem',
                        backgroundColor: '#F48646',
                        color: 'white',
                        border: 'none',
                        borderRadius: '30px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(244, 134, 70, 0.4)'
                    }} onClick={() => document.getElementById('register-form').scrollIntoView({ behavior: 'smooth' })}>
                        ¡Quiero inscribirme!
                    </button>
                </div>
            </div>

            {/* Benefits Section */}
            <section style={{ padding: '5rem 0', backgroundColor: '#f9f9f9' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontFamily: 'serif', marginBottom: '3rem', color: '#333' }}>
                        ¿Por qué ser Consultora Natura?
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                title: 'Ganancias Ilimitadas',
                                description: 'Tú decides cuánto ganar. Obtén comisiones atractivas por cada venta y bonos por desempeño.'
                            },
                            {
                                title: 'Flexibilidad Total',
                                description: 'Maneja tu propio tiempo. Tú eres tu propia jefa y decides cuándo y dónde trabajar.'
                            },
                            {
                                title: 'Desarrollo Personal',
                                description: 'Accede a cursos gratuitos, entrenamientos exclusivos y herramientas digitales para potenciar tu negocio.'
                            }
                        ].map((benefit, index) => (
                            <div key={index} style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '12px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: '#fff0e6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    color: '#F48646'
                                }}>
                                    <CheckCircle size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>{benefit.title}</h3>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration Form Section */}
            <section id="register-form" style={{ padding: '5rem 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '3rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        border: '1px solid #eee'
                    }}>
                        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: 'serif', marginBottom: '0.5rem', color: '#333' }}>
                            Inscripción de Consultora
                        </h2>
                        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem' }}>
                            Completa el formulario para iniciar tu proceso de inscripción.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Nombre</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu nombre"
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Apellido</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu apellido"
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>DNI</label>
                                <input
                                    type="text"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu DNI"
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Celular</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu número"
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="tu@email.com"
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <button type="submit" disabled={loading} style={{
                                    width: '100%',
                                    padding: '1rem',
                                    backgroundColor: loading ? '#ccc' : '#F48646',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    marginTop: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}>
                                    {loading ? 'Enviando...' : 'Enviar Solicitud'} <ArrowRight size={20} />
                                </button>
                            </div>
                            {message && (
                                <div style={{ gridColumn: '1 / -1', padding: '1rem', backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', borderRadius: '8px', textAlign: 'center' }}>
                                    {message.text}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Consultant;
