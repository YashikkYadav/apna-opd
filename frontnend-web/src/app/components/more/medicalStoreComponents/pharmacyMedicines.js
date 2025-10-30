"use client";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AvailableMedicines = ({ medicines, data }) => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  console.log(">>", data?._id);

  // Fetch cart count on load
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/${data?._id}`
        );
        const mData = await res.json();
        setCartCount(mData.length);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCartCount();
  }, []);

  // Function to add medicine to cart
  const addToCart = async (medicine) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/${data?._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...medicine,
          medicineId: medicine._id,
          storeId: data?._id,
        }),
      });

      setCartCount((prev) => prev + 1);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("⚠️ Could not add to cart. Please try again.");
    }
  };

  return (
    <motion.section
      id="cartSection"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8 relative"
    >
      {/* Section Title + Cart Button */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          Available Medicines
        </h2>

        <button
          onClick={() => router.push(`/cart?storeId=${data?._id}`)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          <ShoppingCart className="w-5 h-5" />
          Cart ({cartCount})
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {medicines?.map((medicine, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 0 3px rgba(37,99,235,0.2)",
            }}
            className="border border-blue-200 rounded-xl p-6 shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">{medicine.name}</h3>
              <p className="mb-2 font-medium">
                Dosage: <span className="font-normal">{medicine.dosage}</span>
              </p>
              <p className="font-medium">
                Price: <span className="font-bold">₹{medicine.price}</span>
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(medicine)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AvailableMedicines;
