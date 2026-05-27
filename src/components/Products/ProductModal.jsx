import React, { useState } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';

const ProductModal = ({ isOpen, onClose, product, onAddToCart, addingToCart }) => {
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !product) return null;

    const formatPrice = (price) => {
      // اطمینان از اینکه price عدد است
      const numericPrice = Number(price);
      if (isNaN(numericPrice) || numericPrice === 0) {
        return 'نامشخص';
      }
      return new Intl.NumberFormat('fa-IR').format(numericPrice) + ' تومان';
    };

    const getScoreStars = (score) => {
        const fullStars = Math.floor(score);
        const hasHalfStar = score % 1 >= 0.5;
        const stars = [];
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push('⭐');
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push('½⭐');
            } else {
                stars.push('☆');
            }
        }
        return stars.join('');
    };

    const handleAddToCart = () => {
        onAddToCart(product, quantity, true);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-right">جزئیات محصول</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                        ✕
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Gallery */}
                        <div>
                            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center mb-4">
                                {product.images_url && product.images_url[activeImage] ? (
                                    <img
                                        src={`http://localhost:3000${product.images_url[activeImage]}`}
                                        alt={product.pname}
                                        className="max-w-full max-h-full object-contain"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                        }}
                                    />
                                ) : (
                                    <div className="text-gray-400 text-6xl">📷</div>
                                )}
                            </div>
                            
                            {product.images_url && product.images_url.length > 1 && (
                                <div className="flex gap-2 justify-center">
                                    {product.images_url.map((url, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(index)}
                                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                                                activeImage === index ? 'border-blue-500' : 'border-gray-200'
                                            }`}
                                        >
                                            <img
                                                src={`http://localhost:3000${url}`}
                                                alt={`${product.pname} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="text-right">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.pname}</h2>
                            
                            {/* Score */}
                            {product.score > 0 && (
                                <div className="flex items-center gap-1 mb-4">
                                    <span className="text-yellow-500">{getScoreStars(product.score)}</span>
                                    <span className="text-gray-600">({product.score} از 10)</span>
                                </div>
                            )}

                            {/* Price */}
                            <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">قیمت:</span>
                                    <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                                </div>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="mb-4">
                                    <h4 className="font-bold text-gray-700 mb-2">توضیحات:</h4>
                                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                                </div>
                            )}

                            {/* Specifications */}
                            {product.detailTable && Object.keys(product.detailTable).length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-bold text-gray-700 mb-2">مشخصات فنی:</h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        {Object.entries(product.detailTable).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-2 border-b last:border-0">
                                                <span className="text-gray-600">{value}</span>
                                                <span className="font-medium text-gray-800">{key}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Stock */}
                            <div className="mb-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                    product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {product.stock > 0 ? `موجودی: ${product.stock} عدد` : 'ناموجود'}
                                </span>
                            </div>

                            {/* Quantity Selector */}
                            {product.stock > 0 && (
                                <div className="flex items-center justify-end gap-4 mb-6">
                                    <span className="text-gray-700">تعداد:</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 bg-gray-200 rounded-md hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center text-lg">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="w-8 h-8 bg-gray-200 rounded-md hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0 || addingToCart[product.id]}
                                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2 text-lg"
                            >
                                {addingToCart[product.id] ? (
                                    <>
                                        <LoadingSpinner size="sm" />
                                        <span>در حال افزودن...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>🛒</span>
                                        <span>افزودن به سبد خرید</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;