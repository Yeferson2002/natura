import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ChevronLeft } from 'lucide-react';
import '../components/home/Home.css';
import RecommendationsCarousel from '../components/RecommendationsCarousel';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProductAndRelated = async () => {
            try {
                setLoading(true);
                // Fetch current product
                const response = await fetch(`https://natura-jl7g.onrender.com/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Producto no encontrado');
                }
                const data = await response.json();
                setProduct(data);

                // Fetch all products for recommendations (in a real app, this might be a specific "related" endpoint)
                const relatedResponse = await fetch('https://natura-jl7g.onrender.com/api/products');
                const relatedData = await relatedResponse.json();
                // Filter out the current product from recommendations
                setRelatedProducts(relatedData.filter(p => p.id !== parseInt(id)));

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProductAndRelated();
        // Reset selected image when id changes
        setSelectedImage(0);
        // Scroll to top when product changes
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            alert('¡Producto agregado al carrito!');
        }
    };

    if (loading) {
        return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Cargando...</div>;
    }

    if (error || !product) {
        return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>{error || 'Producto no encontrado'}</div>;
    }

    // Ensure images array exists and has content, otherwise fallback
    const images = product.images && product.images.length > 0
        ? product.images
        : [product.image || 'https://via.placeholder.com/500'];

    return (
        <div style={{ paddingBottom: '4rem', backgroundColor: '#fff' }}>
            {/* Breadcrumb */}
            <div className="container" style={{ padding: '1rem 0', fontSize: '0.85rem', color: '#666' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#666' }}>inicio</Link>
                <span style={{ margin: '0 0.5rem' }}>•</span>
                <Link to="/perfumeria" style={{ textDecoration: 'none', color: '#666' }}>perfumería</Link>
                <span style={{ margin: '0 0.5rem' }}>•</span>
                <span style={{ fontWeight: 'bold' }}>{product.name}</span>
            </div>

            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', marginTop: '2rem' }}>
                {/* Left: Image Gallery */}
                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Main Image */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        minHeight: '500px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {product.tag && (
                            <span style={{
                                position: 'absolute',
                                top: '2rem',
                                left: '2rem',
                                backgroundColor: product.tagColor || '#A7C7E7',
                                padding: '0.4rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                color: '#333',
                                zIndex: 10
                            }}>
                                {product.tag}
                            </span>
                        )}
                        <button style={{
                            position: 'absolute',
                            top: '2rem',
                            right: '2rem',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            zIndex: 10
                        }}>
                            <Heart size={28} color="#999" />
                        </button>

                        <img
                            src={images[selectedImage]}
                            alt={product.name}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '500px',
                                objectFit: 'contain'
                            }}
                        />
                    </div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        backgroundColor: '#f9f9f9',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        border: selectedImage === index ? '2px solid #F48646' : '2px solid transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`Vista ${index + 1}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Details */}
                <div style={{ flex: '1 1 400px', padding: '2rem 0' }}>
                    <div style={{ fontSize: '1.1rem', color: '#666', marginBottom: '0.5rem' }}>{product.brand}</div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1.5rem', lineHeight: '1.2' }}>{product.name}</h1>

                    {/* Price */}
                    <div style={{ marginBottom: '2rem' }}>
                        {product.originalPrice && (
                            <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                                S/ {parseFloat(product.originalPrice).toFixed(2)}
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                                S/ {parseFloat(product.price).toFixed(2)}
                            </span>
                            {product.discount && (
                                <span style={{ backgroundColor: '#E3F2FD', color: '#1976D2', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <button
                        onClick={handleAddToCart}
                        style={{
                            backgroundColor: '#F48646',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 3rem',
                            borderRadius: '30px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            width: '100%',
                            maxWidth: '300px',
                            marginBottom: '2rem',
                            boxShadow: '0 4px 12px rgba(244, 134, 70, 0.3)'
                        }}
                    >
                        Agregar al carrito
                    </button>

                    {/* Description */}
                    <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>Descripción</h3>
                        <p style={{ lineHeight: '1.6', color: '#666' }}>
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="container" style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2rem', color: '#333' }}>
                    También te puede interesar
                </h2>
                <RecommendationsCarousel products={relatedProducts} />
            </div>
        </div >
    );
};

export default ProductDetail;
