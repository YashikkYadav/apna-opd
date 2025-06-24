"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Star,
  ShoppingCart,
  Upload,
  Filter,
  Check,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { medicines, pharmacyReviews, pharmacyFaqs } from "../data";

const PharmacyStorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const categories = ["All", "Tablet", "Syrup", "Injection", "OTC", "Ayurvedic"];
  const timeSlots = [
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM",
    "6:00 PM - 9:00 PM",
  ];

  const filteredMedicines = useMemo(() => {
    let filtered = medicines.filter((medicine) => {
      const matchesSearch =
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.salt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || medicine.category === selectedCategory;
      const matchesStock = !showInStockOnly || medicine.inStock;
      const matchesDiscount = !showDiscountedOnly || medicine.discount > 0;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock &&
        matchesDiscount
      );
    });

    // Sort medicines
    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "discount") {
      filtered.sort((a, b) => b.discount - a.discount);
    }

    return filtered;
  }, [searchTerm, selectedCategory, showInStockOnly, showDiscountedOnly, sortBy]);

  const addToCart = (medicine: any) => {
    const existingItem = cart.find((item) => item.id === medicine.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, newQuantity: number) => {
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
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handlePrescriptionUpload = () => {
    setPrescriptionUploaded(true);
    alert(
      "Prescription uploaded successfully! We will call you to confirm availability and pricing."
    );
  };

  return (
    <div className="min-h-screen bg-[#f6fafd] py-6 px-2 md:px-0">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto rounded-3xl shadow-2xl bg-[#1573ad] p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden mt-6">
        {/* Background Circles */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-300/30 rounded-full z-0" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-300/30 rounded-full z-0" />
        {/* Pharmacy Info */}
        <div className="relative z-10 flex-1 flex flex-col justify-center text-white w-full md:w-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight">MediPlus Pharmacy</h1>
          <div className="flex items-center gap-3 mt-2 mb-4">
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
              <Check size={14} />
              Verified
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <MapPin size={16} />
              <span>Vaishali Nagar, Jaipur</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Clock size={16} />
              <span>Open: 8:00 AM - 11:00 PM</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-green-500 px-3 py-1 rounded-full text-sm">24x7 Delivery</span>
            <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">Accepts Prescriptions</span>
            <span className="bg-orange-500 px-3 py-1 rounded-full text-sm">Discounts Available</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button className="bg-white text-blue-700 font-semibold rounded-full px-8 py-3 flex items-center gap-2 shadow-lg transition text-lg">
              <ShoppingCart className="w-5 h-5" />
              Order Medicines
            </button>
            <button
              onClick={handlePrescriptionUpload}
              className="bg-green-500 text-white font-semibold rounded-full px-8 py-3 flex items-center gap-2 shadow-lg transition text-lg"
            >
              <Upload className="w-5 h-5" />
              Upload Prescription
            </button>
            <button className="bg-blue-500 text-white font-semibold rounded-full px-8 py-3 flex items-center gap-2 shadow-lg transition text-lg">
              <Phone className="w-5 h-5" />
              Call Now
            </button>
          </div>
        </div>
      </div>

      {/* About & Services Section */}
      <div className="max-w-7xl mx-auto mt-12 px-2">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl font-extrabold text-blue-700">About MediPlus Pharmacy</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* About Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-7 text-gray-800">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">About</h3>
            <p className="text-base leading-relaxed">
              Serving the Jaipur community for over 15 years, MediPlus Pharmacy is your trusted healthcare partner. We specialize in providing genuine medicines at affordable prices with fast delivery across the city.
            </p>
          </div>
          {/* Services Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-7 text-gray-800">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Services Offered</h3>
            <ul className="text-base leading-relaxed space-y-1">
              <li>• Allopathic Medicines</li>
              <li>• Ayurvedic Products</li>
              <li>• Surgical Equipment</li>
              <li>• Home Delivery</li>
            </ul>
            <h3 className="text-2xl font-bold text-blue-700 mt-6 mb-3">Partnerships</h3>
            <ul className="text-base leading-relaxed space-y-1">
              <li>• SMS Hospital</li>
              <li>• Fortis Healthcare</li>
              <li>• Local Clinics Network</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Search & Filters Section */}
      <div className="max-w-7xl mx-auto mt-12 px-2">
        <div className="bg-white rounded-2xl shadow-2xl p-7 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search medicines by name, salt, or condition..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="discount">Sort by Discount</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showInStockOnly}
                onChange={(e) => setShowInStockOnly(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">In Stock Only</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showDiscountedOnly}
                onChange={(e) => setShowDiscountedOnly(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Discounted Items</span>
            </label>
          </div>
        </div>
      </div>

      {/* Medicine Catalog Section */}
      <div className="max-w-7xl mx-auto mt-12 px-2">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl font-extrabold text-blue-700">Available Medicines</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 hover:shadow-blue-200 transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-blue-800">{medicine.name}</h3>
                  {medicine.discount > 0 && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {medicine.discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-1">Salt: {medicine.salt}</p>
                <p className="text-gray-600 text-sm mb-2">Mfg: {medicine.manufacturer}</p>
                <p className="text-gray-600 text-sm mb-3">Pack: {medicine.packSize}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-500 line-through text-sm">₹{medicine.mrp}</span>
                  <span className="text-2xl font-bold text-green-600">₹{medicine.price}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    medicine.inStock
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {medicine.inStock ? "In Stock" : "Out of Stock"}
                </span>
                <button
                  onClick={() => addToCart(medicine)}
                  disabled={!medicine.inStock}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Prescription Section */}
      <div className="max-w-7xl mx-auto mt-12 px-2">
        <div className="bg-white rounded-2xl shadow-2xl p-7 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Upload Prescription</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {prescriptionUploaded ? (
              <div className="text-green-600">
                <Check size={48} className="mx-auto mb-4" />
                <p className="text-lg font-semibold">Prescription Uploaded Successfully!</p>
                <p className="text-gray-600 mt-2">We'll call you to confirm availability and pricing.</p>
              </div>
            ) : (
              <div>
                <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-semibold mb-2">Upload your prescription</p>
                <p className="text-gray-600 mb-4">Support formats: JPG, PNG, PDF (Max 5MB)</p>
                <button
                  onClick={handlePrescriptionUpload}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-7xl mx-auto mt-12 px-2">
        <div className="flex items-center gap-3 mb-8">
          <Star className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl font-extrabold text-blue-700">Customer Reviews</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pharmacyReviews.map((review, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-2xl p-7 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{review.date}</span>
              </div>
              <p className="text-gray-800 mb-2">"{review.review}"</p>
              <p className="text-sm text-gray-600 font-semibold">{review.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location & Contact Section */}
      <div className="max-w-7xl mx-auto mt-12 px-2">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-pink-500" /> Location & Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Map View & Address */}
            <div className="bg-[#f4f8fc] rounded-2xl p-8 flex flex-col items-start gap-6 min-h-[260px]">
              <div className="flex items-center gap-3">
                <span className="text-3xl">30e</span>
                <div className="font-bold text-xl text-gray-800">Interactive<br/>Map View</div>
              </div>
              <div className="font-bold text-lg text-gray-600 mt-4">MEDIPLUS PHARMACY</div>
              <div className="text-gray-500 font-semibold text-base">VAISHALI NAGAR, JAIPUR</div>
            </div>
            {/* Right: Contact Info */}
            <div className="bg-[#f4f8fc] rounded-2xl p-8 flex flex-col gap-6 min-h-[260px]">
              <div className="font-bold text-2xl text-gray-800 mb-2">Contact Information</div>
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-blue-100 text-blue-600 rounded-full p-3 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </span>
                <div>
                  <div className="font-semibold text-gray-700">Address:</div>
                  <div className="text-gray-600">VAISHALI NAGAR, JAIPUR, RAJASTHAN 302021</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-blue-100 text-blue-600 rounded-full p-3 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </span>
                <div>
                  <div className="font-semibold text-gray-700">Phone:</div>
                  <div className="text-gray-600">0124-1234567</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-blue-100 text-blue-600 rounded-full p-3 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </span>
                <div>
                  <div className="font-semibold text-gray-700">Email:</div>
                  <div className="text-gray-600">info@mediplus.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto mt-12 px-2">
        <div className="bg-white rounded-2xl shadow-2xl p-7 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {pharmacyFaqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto mt-12 px-2 pb-12">
        <div className="bg-white rounded-2xl shadow-2xl p-7">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Contact & Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
              <Phone size={20} />
              Call Store
            </button>
            <button className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
              <MessageCircle size={20} />
              WhatsApp
            </button>
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Ask a Question
            </button>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-700">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-blue-800">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.salt}</p>
                          <p className="text-green-600 font-semibold">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">Delivery Options</h3>
                    <div className="space-y-3 mb-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="delivery"
                          value="delivery"
                          checked={deliveryOption === "delivery"}
                          onChange={(e) => setDeliveryOption(e.target.value)}
                        />
                        <span>Home Delivery (₹30)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="delivery"
                          value="pickup"
                          checked={deliveryOption === "pickup"}
                          onChange={(e) => setDeliveryOption(e.target.value)}
                        />
                        <span>Store Pickup (Free)</span>
                      </label>
                    </div>

                    {deliveryOption === "delivery" && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Select Time Slot:</label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg"
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

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>Subtotal:</span>
                        <span>₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Delivery:</span>
                        <span>₹{deliveryOption === "delivery" ? 30 : 0}</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>₹{cartTotal + (deliveryOption === "delivery" ? 30 : 0)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
                        Cash on Delivery
                      </button>
                      <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Pay Online
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyStorePage; 