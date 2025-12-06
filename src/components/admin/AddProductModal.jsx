import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Link, Image as ImageIcon, Trash2 } from 'lucide-react';

const AddProductModal = ({ isOpen, onClose, onProductAdded, productToEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        CategoryId: '',
        originalPrice: '',
        discount: '',
        price: '',
        stock: '',
        image: '', // Primary image URL (fallback)
        description: '',
        status: 'Disponible'
    });

    // State for multiple images (up to 3)
    const [imageFiles, setImageFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState(['', '', '']); // Array of 3 strings for URLs
    const [uploadType, setUploadType] = useState('url'); // 'url' or 'file'
    const [loading, setLoading] = useState(false);
    const [previewUrls, setPreviewUrls] = useState(['', '', '']);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://natura-jl7g.onrender.com/api/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name || '',
                brand: productToEdit.brand || '',
                CategoryId: productToEdit.CategoryId || '',
                originalPrice: productToEdit.originalPrice || '',
                discount: productToEdit.discount || '',
                price: productToEdit.price || '',
                stock: productToEdit.stock || '',
                image: productToEdit.image || '',
                description: productToEdit.description || '',
                status: productToEdit.status || 'Disponible'
            });

            // Populate images
            const urls = [
                productToEdit.image || '',
                productToEdit.image2 || '',
                productToEdit.image3 || ''
            ];
            setImageUrls(urls);
            setPreviewUrls(urls);
            setUploadType('url'); // Default to URL view for edit
        } else {
            // Reset form for new product
            setFormData({
                name: '',
                brand: '',
                CategoryId: '',
                originalPrice: '',
                discount: '',
                price: '',
                stock: '',
                image: '',
                description: '',
                status: 'Disponible'
            });
            setImageUrls(['', '', '']);
            setPreviewUrls(['', '', '']);
            setImageFiles([]);
            setUploadType('url');
        }
    }, [productToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Auto-calculate price if originalPrice or discount changes
            if (name === 'originalPrice' || name === 'discount') {
                const original = parseFloat(name === 'originalPrice' ? value : prev.originalPrice) || 0;
                const disc = parseFloat(name === 'discount' ? value : prev.discount) || 0;

                if (original > 0) {
                    const finalPrice = original - (original * disc / 100);
                    newData.price = finalPrice.toFixed(2);
                }
            }

            return newData;
        });
    };

    const handleUrlChange = (index, value) => {
        const newUrls = [...imageUrls];
        newUrls[index] = value;
        setImageUrls(newUrls);

        const newPreviews = [...previewUrls];
        newPreviews[index] = value;
        setPreviewUrls(newPreviews);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Limit to 3 files total
            const newFiles = files.slice(0, 3);
            setImageFiles(newFiles);

            // Generate previews
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            // Pad with empty strings to maintain 3 slots
            while (newPreviews.length < 3) newPreviews.push('');
            setPreviewUrls(newPreviews);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const confirmSubmit = async () => {
        setLoading(true);

        try {
            let body;
            let headers = {};

            if (uploadType === 'file' && imageFiles.length > 0) {
                const data = new FormData();
                data.append('name', formData.name);
                data.append('brand', formData.brand);
                data.append('CategoryId', formData.CategoryId);
                data.append('originalPrice', formData.originalPrice);
                data.append('discount', formData.discount);
                data.append('price', formData.price);
                data.append('stock', formData.stock);
                data.append('description', formData.description);
                data.append('status', formData.status);

                // Append each file with the key 'images'
                imageFiles.forEach(file => {
                    data.append('images', file);
                });

                body = data;
            } else {
                // For URLs, we'll send the first valid URL as 'image' and all as 'images' array if backend supported it fully for URLs
                // For now, let's send the first non-empty URL as the main image
                const validUrls = imageUrls.filter(url => url.trim() !== '');
                const mainImage = validUrls.length > 0 ? validUrls[0] : '';
                const image2 = validUrls.length > 1 ? validUrls[1] : '';
                const image3 = validUrls.length > 2 ? validUrls[2] : '';

                const data = {
                    ...formData,
                    image: mainImage,
                    image2: image2,
                    image3: image3
                };

                body = JSON.stringify(data);
                headers['Content-Type'] = 'application/json';
            }

            const url = productToEdit ? `/api/products/${productToEdit.id}` : '/api/products';
            const method = productToEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body
            });

            if (response.ok) {
                setShowConfirmModal(false);
                setShowSuccessModal(true);
                onProductAdded();

                setTimeout(() => {
                    setShowSuccessModal(false);
                    onClose();
                    // Reset form
                    setFormData({
                        name: '',
                        brand: '',
                        category: 'Perfumería',
                        originalPrice: '',
                        discount: '',
                        price: '',
                        stock: '',
                        image: '',
                        description: '',
                        status: 'Disponible'
                    });
                    setImageFiles([]);
                    setImageUrls(['', '', '']);
                    setPreviewUrls(['', '', '']);
                }, 1500);
            } else {
                const errorData = await response.json();
                alert(`Error al ${productToEdit ? 'actualizar' : 'crear'} producto: ` + (errorData.message || 'Error desconocido'));
            }
        } catch (error) {
            console.error(`Error ${productToEdit ? 'updating' : 'creating'} product:`, error);
            alert('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

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
                maxWidth: '700px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                animation: 'fadeIn 0.3s ease-out'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#333', fontFamily: 'serif' }}>{productToEdit ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Nombre del Producto</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                                placeholder="Ej. Kaiak Clásico"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Marca</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                                placeholder="Ej. Natura"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Categoría</label>
                            <select
                                name="CategoryId"
                                value={formData.CategoryId}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: 'white' }}
                            >
                                <option value="">Seleccionar categoría</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Precio Original (S/)</label>
                            <input
                                type="number"
                                name="originalPrice"
                                value={formData.originalPrice}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Descuento (%)</label>
                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Precio Final (S/)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                disabled
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                                placeholder="0"
                            />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Imágenes del Producto (Máx 3)</label>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setUploadType('url')}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        borderRadius: '8px',
                                        border: uploadType === 'url' ? '2px solid #F48646' : '1px solid #e5e7eb',
                                        backgroundColor: uploadType === 'url' ? '#fff0e6' : 'white',
                                        color: uploadType === 'url' ? '#F48646' : '#666',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Link size={18} /> URL de Imagen
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUploadType('file')}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        borderRadius: '8px',
                                        border: uploadType === 'file' ? '2px solid #F48646' : '1px solid #e5e7eb',
                                        backgroundColor: uploadType === 'file' ? '#fff0e6' : 'white',
                                        color: uploadType === 'file' ? '#F48646' : '#666',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Upload size={18} /> Subir Archivos
                                </button>
                            </div>

                            {uploadType === 'url' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {[0, 1, 2].map((index) => (
                                        <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <span style={{ color: '#666', fontSize: '0.9rem', width: '20px' }}>{index + 1}.</span>
                                            <input
                                                type="text"
                                                value={imageUrls[index]}
                                                onChange={(e) => handleUrlChange(index, e.target.value)}
                                                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                                                placeholder={`URL de imagen ${index + 1}`}
                                            />
                                            <div style={{
                                                width: '42px',
                                                height: '42px',
                                                borderRadius: '8px',
                                                border: '1px solid #e5e7eb',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#f9fafb',
                                                overflow: 'hidden',
                                                flexShrink: 0
                                            }}>
                                                {previewUrls[index] ? (
                                                    <img src={previewUrls[index]} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <ImageIcon size={20} color="#9ca3af" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                border: '1px solid #d1d5db',
                                                backgroundColor: 'white'
                                            }}
                                        />
                                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>Puedes seleccionar hasta 3 imágenes.</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {[0, 1, 2].map((index) => (
                                            <div key={index} style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '8px',
                                                border: '1px solid #e5e7eb',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#f9fafb',
                                                overflow: 'hidden',
                                                position: 'relative'
                                            }}>
                                                {previewUrls[index] ? (
                                                    <img src={previewUrls[index]} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <span style={{ color: '#ccc', fontSize: '0.8rem' }}>{index + 1}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical' }}
                                placeholder="Detalles del producto..."
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '30px',
                                border: '1px solid #d1d5db',
                                backgroundColor: 'white',
                                color: '#374151',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '30px',
                                border: 'none',
                                backgroundColor: '#F48646',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            <Save size={20} />
                            {loading ? 'Guardando...' : (productToEdit ? 'Actualizar Producto' : 'Guardar Producto')}
                        </button>
                    </div>
                </form>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
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
                    zIndex: 1100 // Higher than the main modal
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        width: '90%',
                        maxWidth: '400px',
                        textAlign: 'center',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#333', fontSize: '1.25rem' }}>
                            {productToEdit ? '¿Actualizar producto?' : '¿Guardar producto?'}
                        </h3>
                        <p style={{ color: '#666', marginBottom: '2rem' }}>
                            ¿Estás seguro de que deseas {productToEdit ? 'actualizar' : 'guardar'} este producto?
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button
                                type="button"
                                onClick={() => setShowConfirmModal(false)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '30px',
                                    border: '1px solid #d1d5db',
                                    backgroundColor: 'white',
                                    color: '#374151',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={confirmSubmit}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '30px',
                                    border: 'none',
                                    backgroundColor: '#F48646',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                {productToEdit ? 'Actualizar' : 'Guardar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
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
                    zIndex: 1200
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        width: '90%',
                        maxWidth: '400px',
                        textAlign: 'center',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: '#ecfdf5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#10b981'
                        }}>
                            <Save size={32} />
                        </div>
                        <h3 style={{ margin: 0, color: '#333', fontSize: '1.25rem' }}>
                            ¡Éxito!
                        </h3>
                        <p style={{ color: '#666', margin: 0 }}>
                            {productToEdit ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProductModal;
