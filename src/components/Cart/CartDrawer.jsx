import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useNavigate } from 'react-router';

const CartDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const { cartItems, cartCount, totalPrice, updateQuantity, removeFromCart, loading } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        
        setCheckoutLoading(true);
        try {
            setIsOpen(false);
            navigate('/profile?tab=checkout');
        } finally {
            setCheckoutLoading(false);
        }
    };
    
    return (
        <>
            {/* Cart Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-400 p-4 shadow-lg hover:bg-blue-500 transition-colors z-40 flex items-center gap-2 ms-3"
            >
                <span>سبد خرید</span>
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {cartCount}
                    </span>
                )}
            </button>

            {/* Drawer Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
                    <div className="fixed left-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                            <button onClick={() => setIsOpen(false)} className="text-gray-500 text-2xl">
                                ✕
                            </button>
                            <h2 className="text-xl font-bold">سبد خرید</h2>
                            <div className="w-8"></div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4" style={{ height: 'calc(100% - 180px)' }}>
                            {loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <LoadingSpinner />
                                </div>
                            ) : cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🛒</div>
                                    <p className="text-gray-500">سبد خرید شما خالی است</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.productId} className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex gap-3">
                                                {/* Product Image */}
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                                    {item.image ? (
                                                        <img
                                                            src={`http://localhost:3000${item.image}`}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            📷
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Product Info */}
                                                <div className="flex-1 text-right">
                                                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                                                    <p className="text-sm text-blue-600 font-bold mt-1">
                                                        {formatPrice(item.price)}
                                                    </p>
                                                    
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center justify-end gap-2 mt-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                            className="w-6 h-6 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center justify-center"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                            className="w-6 h-6 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center justify-center"
                                                        >
                                                            +
                                                        </button>
                                                        <button
                                                            onClick={() => removeFromCart(item.productId)}
                                                            className="text-red-500 text-sm mr-2"
                                                        >
                                                            حذف
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600">جمع کل:</span>
                                    <span className="text-xl font-bold text-blue-600">{formatPrice(totalPrice)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={checkoutLoading}
                                    className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
                                >
                                    {checkoutLoading ? (
                                        <>
                                            <LoadingSpinner size="sm" />
                                            <span>در حال انتقال...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>💰</span>
                                            <span>ثبت سفارش</span>
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-gray-500 text-center mt-2">
                                    {!isAuthenticated && 'برای ثبت سفارش لطفاً وارد حساب خود شوید'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default CartDrawer;
