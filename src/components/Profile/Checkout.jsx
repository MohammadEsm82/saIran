import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../../contexts/CartContext';
import orderApi from '../../api/orderApi';
import LoadingSpinner from '../Common/LoadingSpinner';

const Checkout = ({ showAlert, onComplete }) => {
    const navigate = useNavigate();
    const { cartItems, totalPrice, clearCart, loadCart } = useCart();
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false); // use if cart fetch is needed
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (cartItems.length === 0) {
            showAlert('سبد خرید شما خالی است', 'warning');
            setTimeout(() => {
                navigate('/profile?tab=personal');
            }, 2000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    const formatPrice = (price) => {
        const numericPrice = Number(price);
        if (isNaN(numericPrice) || numericPrice === 0) {
            return 'نامشخص';
        }
        return new Intl.NumberFormat('fa-IR').format(numericPrice) + ' تومان';
    };

    const handleSubmitOrder = async () => {
        if (cartItems.length === 0) {
            showAlert('سبد خرید خالی است', 'error');
            return;
        }

        setSubmitting(true);
        try {
            const result = await orderApi.createOrder();
            if (result.success) {
                showAlert('سفارش شما با موفقیت ثبت شد', 'success');
                await clearCart();
                await loadCart();
                
                // رفتن به صفحه سفارشات
                setTimeout(() => {
                    if (onComplete) {
                        onComplete();
                    } else {
                        navigate('/profile?tab=orders');
                    }
                }, 2000);
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            showAlert('خطا در ثبت سفارش', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">سبد خرید خالی است</h3>
                <p className="text-gray-500">لطفاً ابتدا محصولاتی را به سبد خرید اضافه کنید</p>
                <button
                    onClick={() => navigate('/products')}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    مشاهده محصولات
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-right">تسویه حساب</h2>

            {/* Order Summary */}
            <div className="bg-white border rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-3 border-b">
                    <h3 className="font-bold text-right">خلاصه سفارش</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-3">
                        {cartItems.map((item) => (
                            <div key={item.productId} className="flex justify-between items-center border-b pb-3">
                                <div className="text-right">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">تعداد: {item.quantity}</p>
                                </div>
                                <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">جمع کل:</span>
                            <span className="text-2xl font-bold text-blue-600">{formatPrice(totalPrice)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
                <button
                    onClick={handleSubmitOrder}
                    disabled={submitting || cartItems.length === 0}
                    className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2 text-lg"
                >
                    {submitting ? (
                        <>
                            <LoadingSpinner size="sm" />
                            <span>در حال ثبت سفارش...</span>
                        </>
                    ) : (
                        <>
                            <span>✅</span>
                            <span>تایید و ثبت سفارش</span>
                        </>
                    )}
                </button>
                <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    بازگشت به محصولات
                </button>
            </div>

            {/* Info Note */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-right">
                <p className="text-sm text-blue-800">
                    📝 پس از ثبت سفارش، وضعیت آن در بخش "سفارشات" قابل پیگیری است.
                    در صورت نیاز، کارشناسان ما با شما تماس خواهند گرفت.
                </p>
            </div>
        </div>
    );
};

export default Checkout;