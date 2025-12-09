import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Eye, EyeOff, ArrowLeft, Briefcase } from 'lucide-react';

const LoginProfessional = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isEmail = code.includes('@');
            const payload = isEmail ? { email: code, password } : { dni: code, password };

            const baseUrl = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('userInfo', JSON.stringify(data));

                if (data.role === 'admin') {
                    navigate('/admin/dashboard');
                } else if (data.role === 'consultant') {
                    navigate('/consultant/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                alert(data.message || "Credenciales inválidas");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#f0f2f5', // Slightly different background for professional area
            padding: '2rem',
            paddingTop: '8rem',
            position: 'relative'
        }}>
            {/* Simplified Header */}
            <div style={{
                width: '100%',
                padding: '1rem',
                borderBottom: '1px solid #d1d5db',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
                left: 0
            }}>
                <Link to="/" style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    color: '#666',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                }}>
                    <ArrowLeft size={20} />
                    <span>Volver</span>
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: '400', color: 'var(--color-text-main)', letterSpacing: '-0.5px', fontFamily: 'serif' }}>
                        natura
                    </div>
                </Link>
            </div>

            <div style={{
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                width: '100%',
                maxWidth: '450px',
                textAlign: 'center',
                borderTop: '4px solid #F48646' // Accent border for professional look
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    color: '#F48646'
                }}>
                    <Briefcase size={32} />
                </div>
                <h1 style={{
                    fontFamily: 'serif',
                    fontSize: '1.8rem',
                    color: '#333',
                    marginBottom: '0.5rem'
                }}>
                    Acceso Profesional
                </h1>
                <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.95rem' }}>
                    Portal exclusivo para Consultoras y Administrativos
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                            Código de Consultora / Usuario
                        </label>
                        <div style={{ position: 'relative' }}>
                            <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Ingresa tu código"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 1rem 0.8rem 3rem',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#F48646'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                            Contraseña
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 3rem 0.8rem 3rem',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#F48646'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#999',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                            <a href="#" style={{ fontSize: '0.85rem', color: '#F48646', textDecoration: 'none' }}>
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#333', // Darker button for professional feel
                            color: 'white',
                            padding: '1rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginTop: '0.5rem',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#000'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#333'}
                    >
                        Ingresar <ArrowRight size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginProfessional;
