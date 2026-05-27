import React, { useState, useEffect } from 'react';
import productApi from '../api/productApi';
import { useCart } from '../contexts/CartContext';
import ProductModal from '../components/Products/ProductModal';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [addingToCart, setAddingToCart] = useState({});
    
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterAndSortProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products, searchTerm, sortBy, priceRange]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const result = await productApi.getProducts(1, 100);
            if (result.success) {
                setProducts(result.data.products);
                setFilteredProducts(result.data.products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortProducts = () => {
        let filtered = [...products];

        // جستجو
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.pname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // فیلتر قیمت
        if (priceRange.min) {
            filtered = filtered.filter(product => product.price >= parseInt(priceRange.min));
        }
        if (priceRange.max) {
            filtered = filtered.filter(product => product.price <= parseInt(priceRange.max));
        }

        // مرتب‌سازی
        switch (sortBy) {
            case 'price_asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'score_desc':
                filtered.sort((a, b) => b.score - a.score);
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    };

    const handleAddToCart = async (product, count=1, isModal, e) => {
        !isModal && e.stopPropagation();
        setAddingToCart(prev => ({ ...prev, [product.id]: true }));
        
        const result = await addToCart(product, count);
        
        setTimeout(() => {
            setAddingToCart(prev => ({ ...prev, [product.id]: false }));
        }, 500);
        
        if (result.success) {
            // میتونید یه نوتیفیکیشن نشون بدید
        }
    };

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 text-right">محصولات</h1>
                </div>

                {/* Filters Bar */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* جستجو */}
                        <div>
                            <input
                                type="text"
                                placeholder="جستجوی محصول..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                            />
                        </div>

                        {/* مرتب‌سازی */}
                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                            >
                                <option value="default">مرتب‌سازی پیش‌فرض</option>
                                <option value="price_asc">قیمت: کم به زیاد</option>
                                <option value="price_desc">قیمت: زیاد به کم</option>
                                <option value="score_desc">بالاترین امتیاز</option>
                                <option value="newest">جدیدترین</option>
                            </select>
                        </div>

                        {/* حداقل قیمت */}
                        <div>
                            <input
                                type="number"
                                placeholder="حداقل قیمت"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left"
                                dir="ltr"
                            />
                        </div>

                        {/* حداکثر قیمت */}
                        <div>
                            <input
                                type="number"
                                placeholder="حداکثر قیمت"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left"
                                dir="ltr"
                            />
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-700">محصولی یافت نشد</h3>
                        <p className="text-gray-500 mt-2">لطفاً فیلترهای جستجو را تغییر دهید</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => openProductModal(product)}
                            >
                                {/* Product Image */}
                                <div className="h-48 bg-gray-200 relative">
                                    {product.images_url && product.images_url[0] ? (
                                        <img
                                            src={`http://localhost:3000${product.images_url[0]}`}
                                            alt={product.pname}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            📷 بدون تصویر
                                        </div>
                                    )}
                                    
                                    {/* Score Badge */}
                                    {product.score > 0 && (
                                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
                                            <span>{product.score}</span>
                                            <span>⭐</span>
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-4 text-right">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
                                        {product.pname}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                                        {product.description || 'توضیحاتی برای این محصول وجود ندارد'}
                                    </p>

                                    {/* Specifications Preview */}
                                    {product.detailTable && Object.keys(product.detailTable).length > 0 && (
                                        <div className="text-xs text-gray-500 mb-3">
                                            {Object.entries(product.detailTable).slice(0, 2).map(([key, value]) => (
                                                <div key={key} className="inline-block ml-2">
                                                    {key}: {value}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Price and Action */}
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t">
                                        <div>
                                            <span className="text-xl font-bold text-blue-600">
                                                {formatPrice(product.price)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => handleAddToCart(product, 1, false, e)}
                                            disabled={addingToCart[product.id]}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                                        >
                                            {addingToCart[product.id] ? (
                                                <>
                                                    <LoadingSpinner size="sm" />
                                                    <span>در حال افزودن...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>🛒</span>
                                                    <span>افزودن به سبد</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Detail Modal */}
            <ProductModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedProduct(null);
                }}
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                addingToCart={addingToCart}
            />
        </div>
    );
};

export default ProductsPage;