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
    const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        fetchCartItems();
    }, [storeId]);

    const fetchCartItems = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/`);
            const data = await res.json();
            console.log(data)
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
              items: cartItems.map((item) => ({
                medicineId: item.medicineId,
                name: item.name,
                dosage: item.dosage,
                price: item.price,
                quantity: item.quantity,
              })),
              totalAmount: getTotalPrice(),
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${storeId}/orders/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            const data = await res.json();

            if (data?.order?.orderNumber) {
                setOrderNumber(data.order.orderNumber);
                setShowSuccessPopup(true);

                // Clear backend cart
                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/`, { method: "DELETE" });
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
        <div className="min-h-screen bg-gray-50 pt-24 flex justify-center">
            
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8 w-[90%] h-[60vh]"
                >
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                {cartItems.map(item => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        whileHover={{ scale: 1.02 }}
                                        className="flex flex-col p-6 border border-gray-200 rounded-2xl bg-white shadow-sm w-[90%] h-52 mx-auto"
                                    >

                                        {/* Name + Price */}
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-semibold text-lg text-gray-800">Name: {item.name}</h3>
                                            <p className="font-semibold text-lg text-blue-600">Price: ₹{item.price}</p>
                                        </div>

                                        {/* Dosage */}
                                        <p className="text-gray-500 mb-4">Dosage: {item.dosage}</p>

                                        {/* Quantity controls + Delete */}
                                        <div className="flex items-center gap-3 mt-auto">
                                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center font-semibold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => removeItem(item._id)} className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="border-t pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                <div className="text-xl font-semibold text-gray-800">
                                    Cart Value: <span className="text-2xl font-bold text-blue-600">₹{getTotalPrice()}</span>
                                </div>
                                <button
                                    onClick={() => setShowOrderForm(true)}
                                    className="ml-auto bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    Place Order
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>

            {/* Customer Information Modal */}
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

            {/* Success Popup Modal */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 w-full max-w-md text-center"
                    >
                        <h2 className="text-2xl font-bold text-green-600 mb-3">🎉 Order Placed!</h2>
                        <p className="text-gray-700 mb-4">
                            Your order has been placed successfully.
                        </p>
                        <p className="text-lg font-semibold text-blue-600">
                            Order Number: {orderNumber}
                        </p>
                        <button
                            onClick={() => setShowSuccessPopup(false)}
                            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
