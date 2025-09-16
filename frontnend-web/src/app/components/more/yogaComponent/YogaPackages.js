import { motion } from "framer-motion";

export default function Packages({ profileData }) {
  return (
    <motion.div
      id="therapyPackagesSection"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="mx-auto px-6 md:px-12 mt-12 mb-8 shadow-xl py-10 rounded-3xl"
    >
      {/* Title */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Expert Instructors
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-10 mt-2 rounded"></div>
      </div>
      <div className="flex gap-6 flex-wrap">
        {profileData.therapyPackages.map((pkg) => (
          <div
            key={pkg._id}
            className={`p-7 border rounded-xl shadow-md w-80 relative ${
              pkg.name.toLowerCase().includes("premium")
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            <h2 className="text-xl font-bold mb-2 capitalize">{pkg.name}</h2>
            <p className="text-2xl text-blue-600 font-semibold">
              ₹{pkg.price}/month
            </p>

            {/* Show MOST POPULAR if premium */}
            {pkg.name.toLowerCase().includes("premium") && (
              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                MOST POPULAR
              </span>
            )}

            <p className="text-gray-600 mt-4">{pkg.description}</p>

            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg w-full">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
