'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, User, Phone, MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function CartPage() {
    const searchParams = useSearchParams();
    const storeId = searchParams.get('storeId');

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        fetchCartItems();
    }, [storeId]);

    const fetchCartItems = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/`);
            const data = await res.json();
            setCartItems(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            const updatedItem = await res.json();
            setCartItems(items => items.map(item => (item._id === updatedItem._id ? updatedItem : item)));
        } catch (err) {
            console.error("Error updating quantity:", err);
        }
    };

    const removeItem = async (id) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/${id}`, { method: "DELETE" });
            setCartItems(items => items.filter(item => item._id !== id));
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handlePlaceOrder = async () => {
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
            alert('Please fill all customer information');
            return;
        }

        setOrderLoading(true);
        try {
            const orderPayload = {
                customerInfo,
                items: cartItems.map(item => ({
                    medicineId: item._id,
                    name: item.name,
                    dosage: item.dosage,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: getTotalPrice()
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${storeId}/orders/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            const data = await res.json();

            if (data.success) {
                alert(`Order placed successfully! Order Number: ${data.order.orderNumber}`);

                // Clear backend cart
                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/`, {
                    method: "DELETE"
                });
                setCartItems([]);
                setShowOrderForm(false);
                setCustomerInfo({ name: '', phone: '', address: '' });
            } else {
                alert('Failed to place order: ' + data.message);
            }
        } catch (err) {
            console.error('Error placing order:', err);
            alert('Failed to place order');
        } finally {
            setOrderLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-xl">Loading cart...</div></div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-8">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <ShoppingCart className="w-8 h-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-xl text-gray-500">Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4 mb-6">
                                {cartItems.map(item => (
                                    <motion.div key={item._id} layout className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <p className="text-gray-600">{item.dosage}</p>
                                            <p className="text-blue-600 font-bold">₹{item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => removeItem(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-semibold">Total:</span>
                                    <span className="text-2xl font-bold text-blue-600">₹{getTotalPrice()}</span>
                                </div>
                                <button onClick={() => setShowOrderForm(true)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                    Place Order
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>

            {showOrderForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <User className="w-4 h-4" />Full Name
                                </label>
                                <input type="text" value={customerInfo.name} onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your full name" />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <Phone className="w-4 h-4" />Phone Number
                                </label>
                                <input type="tel" value={customerInfo.phone} onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your phone number" />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                    <MapPin className="w-4 h-4" />Delivery Address
                                </label>
                                <textarea value={customerInfo.address} onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none" placeholder="Enter your complete address" />
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total Amount:</span>
                                    <span className="text-xl font-bold text-blue-600">₹{getTotalPrice()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowOrderForm(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button onClick={handlePlaceOrder} disabled={orderLoading} className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50">
                                {orderLoading ? 'Placing Order...' : 'Confirm Order'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}