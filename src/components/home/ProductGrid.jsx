import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useCart } from '../../context/CartContext';

const ProductGrid = () => {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { addToCart } = useCart();

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://natura-jl7g.onrender.com/api/products');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (e, product) => {
        e.preventDefault(); // Prevent navigation if wrapped in Link (though button is outside main link)
        addToCart(product);
        alert('¡Producto agregado al carrito!');
    };

    if (loading) {
        return <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>Cargando productos...</div>;
    }

    return (
        <section className="container">
            <h2 className="section-title">Ofertas Destacadas</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="product-image">
                                {product.discount > 0 && (
                                    <span className="discount-badge">-{product.discount}%</span>
                                )}
                                <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span style={{ color: '#999' }}>Sin Imagen</span>
                                    )}
                                </div>
                            </div>
                            <div className="product-info">
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-name">{product.name}</div>
                                <div className="product-price">
                                    {product.originalPrice && (
                                        <span className="price-original">S/ {product.originalPrice}</span>
                                    )}
                                    <span className="price-current">S/ {product.price}</span>
                                </div>
                            </div>
                        </Link>
                        <div style={{ padding: '0 1rem 1rem' }}>
                            <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="btn-add"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
