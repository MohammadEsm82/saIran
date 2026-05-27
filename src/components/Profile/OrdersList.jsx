import React, { useState, useEffect } from 'react';
import orderApi from '../../api/orderApi';
import productApi from '../../api/productApi';
import LoadingSpinner from '../Common/LoadingSpinner';

const OrdersList = ({ showAlert }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [productsMap, setProductsMap] = useState({});

    useEffect(() => {
        fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const result = await orderApi.getMyOrders();
            if (result.success) {
                // استخراج همه productId ها از همه سفارشات
                const allProductIds = new Set();
                result.data.forEach(order => {
                    const products = typeof order.products === 'string' 
                        ? JSON.parse(order.products) 
                        : order.products;
                    products.forEach(item => allProductIds.add(item.productId));
                });
                
                // دریافت اطلاعات همه محصولات
                const productsMapTemp = {};
                for (const id of allProductIds) {
                    try {
                        const productResult = await productApi.getProductById(id);
                        if (productResult.success) {
                            productsMapTemp[id] = productResult.data.pname;
                        }
                    // eslint-disable-next-line no-unused-vars
                    } catch (error) {
                        productsMapTemp[id] = `محصول #${id}`;
                    }
                }
                setProductsMap(productsMapTemp);
                setOrders(result.data);
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در دریافت سفارشات', error);
        } finally {
            setLoading(false);
        }
    };

    const getProductName = (productId) => {
        return productsMap[productId] || `محصول #${productId}`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'processing':
                return 'در حال پردازش';
            case 'completed':
                return 'تکمیل شده';
            default:
                return status;
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('fa-IR');
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">سفارشی وجود ندارد</h3>
                <p className="text-gray-500">شما هنوز سفارشی ثبت نکرده‌اید</p>
            </div>
        );
    }

    if (selectedOrder) {
        const products = typeof selectedOrder.products === 'string' 
            ? JSON.parse(selectedOrder.products) 
            : selectedOrder.products;

        return (
            <div>
                <button
                    onClick={() => setSelectedOrder(null)}
                    className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                    ← بازگشت به لیست سفارشات
                </button>
                
                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="border-b pb-4 mb-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">
                                سفارش #{selectedOrder.id}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                                {getStatusText(selectedOrder.status)}
                            </span>
                        </div>
                        <p className="text-gray-600 mt-2">
                            تاریخ: {formatDate(selectedOrder.createdAt)}
                        </p>
                    </div>

                    <div className="space-y-3">
                        {products.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b pb-3">
                                <div>
                                    <p className="font-medium">{getProductName(item.productId)}</p>
                                    <p className="text-sm text-gray-500">تعداد: {item.quantity}</p>
                                </div>
                                <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">جمع کل:</span>
                            <span className="text-xl font-bold text-blue-600">
                                {formatPrice(selectedOrder.totalPrice)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => {
                const products = typeof order.products === 'string' 
                    ? JSON.parse(order.products) 
                    : order.products;
                    
                return (
                    <div
                        key={order.id}
                        className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800">سفارش #{order.id}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {formatDate(order.createdAt)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-blue-600">{formatPrice(order.totalPrice)}</p>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${getStatusColor(order.status)}`}>
                                    {getStatusText(order.status)}
                                </span>
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                            <p>محصولات: {products.map(p => getProductName(p.productId)).join('، ')}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrdersList;