'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const FilterSelect = ({ label, value, onChange, options = [] }) => (
    <select
        value={value}
        onChange={onChange}
        className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 bg-white text-blue-800"
    >
        <option value="">{label}</option>
        {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
        ))}
    </select>
);

const LabFilterBar = ({
    search,
    setSearch,
    testType,
    setTestType,
    price,
    setPrice,
    location,
    setLocation,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="relative w-full lg:flex-1">
                    <Search className="absolute left-3 top-3 text-blue-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search tests, packages, or conditions..."
                        className="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none text-blue-900"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Dropdown Filters */}
                <div className="flex flex-wrap gap-2">
                    <FilterSelect
                        label="All Test Types"
                        value={testType}
                        onChange={(e) => setTestType(e.target.value)}
                        options={[
                            { label: 'Blood Tests', value: 'blood' },
                            { label: 'Urine Tests', value: 'urine' },
                            { label: 'Hormonal', value: 'hormonal' },
                            { label: 'Imaging', value: 'imaging' },
                        ]}
                    />
                    <FilterSelect
                        label="All Prices"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        options={[
                            { label: '₹0 - ₹500', value: '0-500' },
                            { label: '₹500 - ₹1000', value: '500-1000' },
                            { label: '₹1000 - ₹2000', value: '1000-2000' },
                            { label: '₹2000+', value: '2000' },
                        ]}
                    />
                    <FilterSelect
                        label="All Locations"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        options={[
                            { label: 'Home Collection', value: 'home' },
                            { label: 'Lab Visit', value: 'lab' },
                        ]}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default LabFilterBar;
