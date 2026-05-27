import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import cartApi from '../api/cartApi';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [synced, setSynced] = useState(false); // برای جلوگیری از همگام‌سازی مکرر
    const syncingRef = useRef(false); // برای جلوگیری از همگام‌سازی همزمان

    // محاسبه مجموع قیمت
    const calculateTotal = (items) => {
        return items.reduce((total, item) => {
            const price = Number(item.price);
            const quantity = Number(item.quantity);
            if (!isNaN(price) && !isNaN(quantity)) {
                return total + (price * quantity);
            }
            return total;
        }, 0);
    };

    // بارگذاری سبد خرید از سرور (فقط وقتی کاربر وارد شده)
    const loadCartFromServer = async () => {
        if (!isAuthenticated) return null;
        
        setLoading(true);
        try {
            const result = await cartApi.getCart();
            if (result.success && result.data.items) {
                const items = result.data.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: Number(item.product?.price) || 0,
                    name: item.product?.pname || 'محصول',
                    image: item.product?.images_url?.[0] || null
                }));
                return items;
            }
            return [];
        } catch (error) {
            console.error('Error loading cart from server:', error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // بارگذاری سبد خرید از localStorage (فقط برای کاربران مهمان)
    const loadCartFromLocal = () => {
        const offlineCart = localStorage.getItem('offlineCart');
        if (offlineCart) {
            const items = JSON.parse(offlineCart);
            return items;
        }
        return [];
    };

    // همگام‌سازی سبد خرید آفلاین با سرور (فقط یک بار بعد از ورود)
    const syncOfflineCartToServer = async () => {
        // اگر قبلاً همگام‌سازی شده یا در حال همگام‌سازی هستیم، انجام نده
        if (synced || syncingRef.current || !isAuthenticated) return false;
        
        const offlineCart = localStorage.getItem('offlineCart');
        if (!offlineCart) return false;
        
        syncingRef.current = true;
        const items = JSON.parse(offlineCart);
        
        if (items.length === 0) {
            syncingRef.current = false;
            setSynced(true);
            return false;
        }
        
        console.log('Syncing offline cart to server...', items);
        
        try {
            // اضافه کردن هر آیتم به سرور
            for (const item of items) {
                await cartApi.addToCart(item.productId, item.quantity);
            }
            // بعد از همگام‌سازی، localStorage رو پاک کن
            localStorage.removeItem('offlineCart');
            setSynced(true);
            return true;
        } catch (error) {
            console.error('Error syncing offline cart:', error);
            return false;
        } finally {
            syncingRef.current = false;
        }
    };

    // بارگذاری سبد خرید (بر اساس وضعیت لاگین)
    const loadCart = async () => {
        if (isAuthenticated) {
            // اگر کاربر وارد شده، از سرور بخوان
            const serverCart = await loadCartFromServer();
            if (serverCart) {
                setCartItems(serverCart);
                setCartCount(serverCart.length);
                setTotalPrice(calculateTotal(serverCart));
            }
        } else {
            // اگر کاربر وارد نشده، از localStorage بخوان
            const localCart = loadCartFromLocal();
            setCartItems(localCart);
            setCartCount(localCart.length);
            setTotalPrice(calculateTotal(localCart));
        }
    };

    // افزودن به سبد خرید
    const addToCart = async (product, quantity = 1) => {
        const productPrice = Number(product.price);
        const safeQuantity = Number(quantity);
        
        if (isNaN(productPrice)) {
            return { success: false, message: 'قیمت محصول نامعتبر است' };
        }
        
        if (isAuthenticated) {
            // کاربر وارد شده -> به سرور اضافه کن
            try {
                const result = await cartApi.addToCart(product.id, safeQuantity);
                if (result.success) {
                    await loadCart(); // reload از سرور
                    return { success: true };
                }
                return { success: false, message: result.message };
            } catch (error) {
                console.error('Error adding to cart:', error);
                return { success: false, message: 'خطا در افزودن به سبد خرید' };
            }
        } else {
            // کاربر وارد نشده -> به localStorage اضافه کن
            const offlineCart = localStorage.getItem('offlineCart');
            let items = offlineCart ? JSON.parse(offlineCart) : [];
            
            const existingIndex = items.findIndex(item => item.productId === product.id);
            if (existingIndex > -1) {
                items[existingIndex].quantity += safeQuantity;
            } else {
                items.push({
                    productId: product.id,
                    quantity: safeQuantity,
                    price: productPrice,
                    name: product.pname,
                    image: product.images_url?.[0] || null
                });
            }
            
            localStorage.setItem('offlineCart', JSON.stringify(items));
            setCartItems(items);
            setCartCount(items.length);
            setTotalPrice(calculateTotal(items));
            
            return { success: true, offline: true };
        }
    };

    // حذف از سبد خرید
    const removeFromCart = async (productId) => {
        if (isAuthenticated) {
            try {
                const result = await cartApi.removeFromCart(productId);
                if (result.success) {
                    await loadCart();
                    return { success: true };
                }
                return { success: false, message: result.message };
            } catch (error) {
                console.error('Error removing from cart:', error);
                return { success: false, message: 'خطا در حذف از سبد خرید' };
            }
        } else {
            const offlineCart = localStorage.getItem('offlineCart');
            let items = offlineCart ? JSON.parse(offlineCart) : [];
            items = items.filter(item => item.productId !== productId);
            localStorage.setItem('offlineCart', JSON.stringify(items));
            setCartItems(items);
            setCartCount(items.length);
            setTotalPrice(calculateTotal(items));
            return { success: true };
        }
    };

    // ویرایش تعداد
    const updateQuantity = async (productId, quantity) => {
        const safeQuantity = Number(quantity);
        
        if (safeQuantity <= 0) {
            return removeFromCart(productId);
        }
        
        if (isAuthenticated) {
            try {
                const result = await cartApi.updateCartItem(productId, safeQuantity);
                if (result.success) {
                    await loadCart();
                    return { success: true };
                }
                return { success: false, message: result.message };
            } catch (error) {
                console.error('Error updating cart:', error);
                return { success: false, message: 'خطا در ویرایش سبد خرید' };
            }
        } else {
            const offlineCart = localStorage.getItem('offlineCart');
            let items = offlineCart ? JSON.parse(offlineCart) : [];
            const index = items.findIndex(item => item.productId === productId);
            if (index > -1) {
                items[index].quantity = safeQuantity;
                localStorage.setItem('offlineCart', JSON.stringify(items));
                setCartItems(items);
                setCartCount(items.length);
                setTotalPrice(calculateTotal(items));
            }
            return { success: true };
        }
    };

    // خالی کردن سبد خرید
    const clearCart = async () => {
        if (isAuthenticated) {
            const items = [...cartItems];
            for (const item of items) {
                await removeFromCart(item.productId);
            }
        } else {
            localStorage.removeItem('offlineCart');
            setCartItems([]);
            setCartCount(0);
            setTotalPrice(0);
        }
    };

    // وقتی کاربر وارد میشه، سبد خرید آفلاین رو همگام‌سازی کن (فقط یک بار)
    useEffect(() => {
        const performSync = async () => {
            if (isAuthenticated && !synced && !syncingRef.current) {
                await syncOfflineCartToServer();
                await loadCart(); // بعد از همگام‌سازی، از سرور بارگذاری کن
            }
        };
        
        performSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]); // فقط وقتی isAuthenticated تغییر میکنه اجرا بشه

    // وقتی کاربر از سیستم خارج میشه، سبد خرید رو پاک کن و synced رو ریست کن
    useEffect(() => {
        if (!isAuthenticated) {
            setSynced(false);
            // از localStorage بارگذاری کن
            const localCart = loadCartFromLocal();
            setCartItems(localCart);
            setCartCount(localCart.length);
            setTotalPrice(calculateTotal(localCart));
        }
    }, [isAuthenticated]);

    // بارگذاری اولیه سبد خرید
    useEffect(() => {
        loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // فقط یک بار در شروع

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            totalPrice,
            loading,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            loadCart
        }}>
            {children}
        </CartContext.Provider>
    );
};