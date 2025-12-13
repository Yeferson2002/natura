import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Check, ThumbsUp } from 'lucide-react';

const AIChatModal = ({ isOpen, onClose, client }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const parseBold = (text) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    const formatText = (text) => {
        const lines = text.split('\n');
        const formattedElements = [];
        let currentList = [];

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            // Check for list items
            if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                const content = trimmedLine.substring(2);
                currentList.push(<li key={`li-${index}`} style={{ marginBottom: '0.25rem' }}>{parseBold(content)}</li>);
            } else {
                // If we have a pending list, push it
                if (currentList.length > 0) {
                    formattedElements.push(<ul key={`ul-${index}`} style={{ paddingLeft: '1.2rem', margin: '0.5rem 0' }}>{currentList}</ul>);
                    currentList = [];
                }

                // Add regular paragraph if not empty
                if (trimmedLine) {
                    formattedElements.push(<p key={`p-${index}`} style={{ margin: '0.5rem 0', minHeight: '1em' }}>{parseBold(trimmedLine)}</p>);
                }
            }
        });

        // Flush remaining list
        if (currentList.length > 0) {
            formattedElements.push(<ul key={`ul-end`} style={{ paddingLeft: '1.2rem', margin: '0.5rem 0' }}>{currentList}</ul>);
        }

        return formattedElements;
    };

    const renderMessageContent = (content) => {
        // Regex to find product tags: <<<PRODUCT:id|name|price|image|reason>>>
        const productRegex = /<<<PRODUCT:(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)>>>/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = productRegex.exec(content)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                const textPart = content.substring(lastIndex, match.index);
                parts.push(<div key={`text-${lastIndex}`}>{formatText(textPart)}</div>);
            }

            // Add the product card
            const [_, id, name, price, image, reason] = match;
            parts.push(
                <ProductCard
                    key={match.index}
                    id={id}
                    name={name}
                    price={price}
                    image={image}
                    reason={reason}
                    clientId={client.id}
                />
            );

            lastIndex = productRegex.lastIndex;
        }

        // Add remaining text
        if (lastIndex < content.length) {
            const textPart = content.substring(lastIndex);
            parts.push(<div key={`text-${lastIndex}`}>{formatText(textPart)}</div>);
        }

        return parts.length > 0 ? parts : formatText(content);
    };

    useEffect(() => {
        if (isOpen && client) {
            // Initial greeting
            setMessages([{
                role: 'model',
                content: `Hola! Soy tu asistente de planificación. Estoy analizando el historial de ${client.firstName} para ayudarte a crear la mejor estrategia. ¿Qué te gustaría saber?`
            }]);
        }
    }, [isOpen, client]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMsg = { role: 'user', content: inputMessage };
        setMessages(prev => [...prev, userMsg]);
        setInputMessage('');
        setLoading(true);

        try {
            const userInfoString = localStorage.getItem('userInfo');
            if (!userInfoString) throw new Error('No user info found');
            const userInfo = JSON.parse(userInfoString);
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify({
                    clientId: client.id,
                    message: userMsg.content,
                    history: messages.map(m => ({ role: m.role, content: m.content }))
                }),
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, config);
            const data = await response.json();

            if (response.ok) {
                setMessages(prev => [...prev, { role: 'model', content: data.response }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', content: 'Lo siento, tuve un problema al procesar tu solicitud. Intenta de nuevo.' }]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { role: 'model', content: 'Error de conexión. Por favor verifica tu internet.' }]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            zIndex: 1100, // Higher than orders modal
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '500px',
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1rem',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Bot size={24} color="white" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Asistente IA</h3>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>Planificando para {client?.firstName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'white',
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Chat Area */}
                <div style={{
                    flex: 1,
                    padding: '1rem',
                    overflowY: 'auto',
                    backgroundColor: '#f9fafb',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        }}>
                            <div style={{
                                maxWidth: '80%',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                borderTopLeftRadius: msg.role === 'user' ? '12px' : '0',
                                borderTopRightRadius: msg.role === 'user' ? '0' : '12px',
                                backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : 'white',
                                color: msg.role === 'user' ? 'white' : '#374151',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                fontSize: '0.95rem',
                                lineHeight: '1.4'
                            }}>
                                {msg.role === 'model' ? renderMessageContent(msg.content) : msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                borderTopLeftRadius: '0',
                                backgroundColor: 'white',
                                color: '#6b7280',
                                fontSize: '0.9rem',
                                fontStyle: 'italic'
                            }}>
                                Escribiendo...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} style={{
                    padding: '1rem',
                    borderTop: '1px solid #e5e7eb',
                    display: 'flex',
                    gap: '0.75rem',
                    backgroundColor: 'white'
                }}>
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            borderRadius: '24px',
                            border: '1px solid #e5e7eb',
                            outline: 'none',
                            fontSize: '0.95rem'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={loading || !inputMessage.trim()}
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: loading || !inputMessage.trim() ? 'not-allowed' : 'pointer',
                            opacity: loading || !inputMessage.trim() ? 0.7 : 1,
                            transition: 'background-color 0.2s'
                        }}
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

const ProductCard = ({ id, name, price, image, reason, clientId }) => {
    const [recommended, setRecommended] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRecommend = async () => {
        setLoading(true);
        try {
            const userInfoString = localStorage.getItem('userInfo');
            if (!userInfoString) return;
            const userInfo = JSON.parse(userInfoString);
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify({
                    clientId: clientId,
                    productId: id,
                    reason: reason
                }),
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recommendations`, config);

            if (response.ok) {
                setRecommended(true);
            } else {
                console.error('Failed to send recommendation');
            }
        } catch (error) {
            console.error('Error recommending:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            margin: '0.5rem 0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
            <img
                src={image}
                alt={name}
                style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
            />
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>{name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: '500' }}>S/ {price}</div>
                {reason && <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.2rem', fontStyle: 'italic' }}>"{reason}"</div>}
            </div>
            <button
                onClick={handleRecommend}
                disabled={recommended || loading}
                style={{
                    border: 'none',
                    background: recommended ? '#dcfce7' : '#f3f4f6',
                    color: recommended ? '#166534' : '#4b5563',
                    padding: '0.4rem',
                    borderRadius: '6px',
                    cursor: recommended ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                }}
            >
                {recommended ? (
                    <>
                        <Check size={14} />
                        Enviado
                    </>
                ) : (
                    <>
                        <ThumbsUp size={14} />
                        Recomendar
                    </>
                )}
            </button>
        </div>
    );
};

export default AIChatModal;
