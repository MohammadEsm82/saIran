import React, { useState, useEffect } from 'react';
import adminApi from '../../api/adminApi';
import LoadingSpinner from '../Common/LoadingSpinner';
import ProductModal from './ProductModal';

const ProductsManagement = ({ showAlert }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const result = await adminApi.getAllProducts(page, 20);
            if (result.success) {
                if (page === 1) {
                    setProducts(result.data.products);
                } else {
                    setProducts(prev => [...prev, ...result.data.products]);
                }
                setHasMore(result.data.products.length === 20);
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در دریافت محصولات', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchKeyword.trim()) {
            setPage(1);
            fetchProducts();
            return;
        }

        setLoading(true);
        try {
            const result = await adminApi.searchProducts(searchKeyword);
            if (result.success) {
                setProducts(result.data.products);
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در جستجو', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, pname) => {
        if (window.confirm(`آیا از حذف محصول "${pname}" مطمئن هستید؟`)) {
            try {
                const result = await adminApi.deleteProduct(id);
                if (result.success) {
                    showAlert('محصول با موفقیت حذف شد', 'success');
                    fetchProducts();
                } else {
                    showAlert(result.message, 'error');
                }
            } catch (error) {
                showAlert('خطا در حذف محصول', error);
            }
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    const openCreateModal = () => {
        setEditingProduct(null);
        setModalOpen(true);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">مدیریت محصولات</h2>
                <button
                    onClick={openCreateModal}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
                >
                    <span>➕</span> افزودن محصول جدید
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="جستجوی محصولات..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-right"
                />
                <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    جستجو
                </button>
            </div>

            {/* Products Table */}
            {loading && products.length === 0 ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">شناسه</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">نام محصول</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">قیمت</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">امتیاز</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">موجودی</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عملیات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm">{product.id}</td>
                                        <td className="px-4 py-3 text-sm font-medium">{product.pname}</td>
                                        <td className="px-4 py-3 text-sm">{formatPrice(product.price)}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className="flex items-center gap-1">
                                                {product.score} ⭐
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                product.stock <= 5 
                                                    ? 'bg-red-100 text-red-700' 
                                                    : 'bg-green-100 text-green-700'
                                            }`}>
                                                {product.stock} عدد
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    ✏️ ویرایش
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.pname)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    🗑️ حذف
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {hasMore && !searchKeyword && (
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setPage(prev => prev + 1)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                بارگذاری بیشتر
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Product Modal */}
            <ProductModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingProduct(null);
                }}
                onSuccess={() => {
                    setModalOpen(false);
                    setEditingProduct(null);
                    setPage(1);
                    fetchProducts();
                }}
                product={editingProduct}
                showAlert={showAlert}
            />
        </div>
    );
};

export default ProductsManagement;