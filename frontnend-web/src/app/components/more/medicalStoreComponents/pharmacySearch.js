'use client';
import { Search } from 'lucide-react'; // or 'react-icons' if you're using that
import { motion } from 'framer-motion';

const FilterCheckbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2 text-sm text-blue-900">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="accent-blue-600 rounded"
        />
        {label}
    </label>
);

const MedicineFilterBar = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    showInStockOnly,
    setShowInStockOnly,
    showDiscountedOnly,
    setShowDiscountedOnly,
    categories = [],
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            <div className="bg-white p-6 md:p-8">
                {/* Top Row */}
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    {/* Search Input */}
                    <div className="relative w-full lg:flex-1">
                        <Search className="absolute left-3 top-3 text-blue-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search medicines by name, salt, or condition..."
                            className="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Dropdowns */}
                    <div className="flex flex-wrap gap-2">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-blue-800"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-blue-800"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price">Sort by Price</option>
                            <option value="discount">Sort by Discount</option>
                        </select>
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="flex flex-wrap gap-4 mt-6">
                    <FilterCheckbox
                        label="In Stock Only"
                        checked={showInStockOnly}
                        onChange={(e) => setShowInStockOnly(e.target.checked)}
                    />
                    <FilterCheckbox
                        label="Discounted Items"
                        checked={showDiscountedOnly}
                        onChange={(e) => setShowDiscountedOnly(e.target.checked)}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default MedicineFilterBar;
