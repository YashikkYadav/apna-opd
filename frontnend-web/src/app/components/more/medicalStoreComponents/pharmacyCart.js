'use client';
import React from 'react';
import { X, Minus, Plus } from 'lucide-react';

const CartModal = ({
    cart,
    setCart,
    showCart,
    setShowCart,
    deliveryOption,
    setDeliveryOption,
    selectedTimeSlot,
    setSelectedTimeSlot,
    timeSlots,
}) => {
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity === 0) {
            setCart(cart.filter((item) => item.id !== id));
        } else {
            setCart(
                cart.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    if (!showCart) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto transition-all">
                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-extrabold text-blue-700">🛒 Your Cart</h2>
                        <button
                            onClick={() => setShowCart(false)}
                            className="text-gray-500 hover:text-red-500 transition"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Cart Body */}
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500 py-10 text-lg">Your cart is empty 🧺</p>
                    ) : (
                        <>
                            <div className="space-y-5 mb-6">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center border-b pb-4"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-blue-800">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.salt}</p>
                                            <p className="text-green-600 font-bold mt-1">₹{item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 border border-blue-300 text-blue-600 rounded-full hover:bg-blue-100 transition"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-6 text-center text-blue-800 font-bold">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 border border-blue-300 text-blue-600 rounded-full hover:bg-blue-100 transition"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Delivery Options */}
                            <div className="border-t pt-6">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">🚚 Delivery Options</h3>
                                <div className="space-y-3 mb-6">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="delivery"
                                            value="delivery"
                                            checked={deliveryOption === 'delivery'}
                                            onChange={(e) => setDeliveryOption(e.target.value)}
                                        />
                                        <span>Home Delivery (₹30)</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="delivery"
                                            value="pickup"
                                            checked={deliveryOption === 'pickup'}
                                            onChange={(e) => setDeliveryOption(e.target.value)}
                                        />
                                        <span>Store Pickup (Free)</span>
                                    </label>
                                </div>

                                {deliveryOption === 'delivery' && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium mb-2 text-gray-700">
                                            Select Time Slot:
                                        </label>
                                        <select
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            value={selectedTimeSlot}
                                            onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                        >
                                            <option value="">Choose time slot</option>
                                            {timeSlots.map((slot) => (
                                                <option key={slot} value={slot}>
                                                    {slot}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Totals */}
                                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700">Subtotal:</span>
                                        <span className="font-medium text-gray-800">₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700">Delivery:</span>
                                        <span className="font-medium text-gray-800">
                                            ₹{deliveryOption === 'delivery' ? 30 : 0}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg text-blue-700 border-t pt-2">
                                        <span>Total:</span>
                                        <span>
                                            ₹{cartTotal + (deliveryOption === 'delivery' ? 30 : 0)}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition">
                                        Cash on Delivery
                                    </button>
                                    <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                                        Pay Online
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartModal;
