'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

const MedicineOrderPage = () => {
  const name  = useParams(); 

  const [formData, setFormData] = useState({
    medicineName: '',
    quantity: 0,
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Medicine order placed!");
    console.log('Order details:', formData, 'Pharmacy Name:', name);
  };

  return (
    <section className="min-h-screen bg-[#0C65A0] text-white py-32 px-6 flex justify-center items-start">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg w-full max-w-xl p-8">
        <h2 className="text-3xl font-bold mb-1 text-center text-[#0C65A0]">Order Medicines</h2>
        <p className="text-center text-gray-600 mb-6">From Pharmacy <strong>{name?.id}</strong></p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Medicine Name</label>
            <input
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C65A0]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              min="1"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C65A0]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C65A0]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0C65A0] text-white py-3 rounded-lg font-semibold hover:bg-[#09507e] transition"
          >
            Submit Order
          </button>
        </form>
      </div>
    </section>
  );
};

export default MedicineOrderPage;