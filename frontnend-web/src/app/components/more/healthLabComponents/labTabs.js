'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Clock, FileText, FlaskConical, Home, Star, User, ChevronDown } from 'lucide-react';
import classNames from 'classnames';

const DiagnosticTabs = ({ tab, setTab, filteredTests, packagesData, openPackage, setOpenPackage, setShowModal, setModalTest }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Tab Navigation */}
            <div className="flex border-b-2 border-blue-200 mb-8">
                <button
                    className={classNames(
                        "px-6 py-3 font-semibold text-lg border-b-4 transition-all rounded-t-2xl",
                        tab === 'tests'
                            ? "border-pink-500 text-pink-600 bg-pink-100"
                            : "border-transparent text-blue-100 hover:text-pink-600"
                    )}
                    onClick={() => setTab('tests')}
                >
                    Individual Tests
                </button>
                <button
                    className={classNames(
                        "px-6 py-3 font-semibold text-lg border-b-4 transition-all rounded-t-2xl",
                        tab === 'packages'
                            ? "border-pink-500 text-pink-600 bg-pink-100"
                            : "border-transparent text-blue-100 hover:text-pink-600"
                    )}
                    onClick={() => setTab('packages')}
                >
                    Test Packages
                </button>
            </div>

            {/* Individual Tests */}
            {tab === 'tests' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {filteredTests.map((test) => {
                        const discount = Math.round((1 - test.discountedPrice / test.originalPrice) * 100);
                        return (
                            <motion.div
                                key={test.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-[#F7F9FB] rounded-2xl p-6 shadow-md border border-blue-200 hover:border-blue-500 transition-all flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-blue-700 mb-1">{test.name}</h3>
                                        {test.popular && (
                                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">Popular</span>
                                        )}
                                    </div>
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 text-white text-xl">{test.icon}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm mb-4">
                                    <div className="flex items-center gap-2"><FlaskConical className="w-4 h-4" /> {test.sampleType}</div>
                                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {test.reportTime}</div>
                                    <div className="flex items-center gap-2">{test.homeCollection ? <Home className="w-4 h-4" /> : <User className="w-4 h-4" />} {test.homeCollection ? 'Home Collection' : 'Lab Visit'}</div>
                                    <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> Digital Report</div>
                                </div>
                                <div className="mt-auto pt-4 border-t flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-600 font-bold text-lg">₹{test.discountedPrice}</span>
                                        <span className="line-through text-slate-400 text-base">₹{test.originalPrice}</span>
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">{discount}% OFF</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowModal(true);
                                            setModalTest(test.name);
                                        }}
                                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-4 py-2 flex items-center gap-2 shadow transition"
                                    >
                                        <ClipboardList className="w-4 h-4" /> Book Test
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Packages */}
            {tab === 'packages' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    {packagesData.map((pkg) => {
                        const discount = Math.round((1 - pkg.discountedPrice / pkg.originalPrice) * 100);
                        return (
                            <motion.div
                                key={pkg.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-[#F7F9FB] rounded-2xl p-6 shadow-md border border-blue-200 hover:border-blue-500 transition-all flex flex-col"
                            >
                                <div className="mb-3">
                                    <h3 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                                        {pkg.name} {pkg.popular && <Star className="w-4 h-4 text-yellow-500" />}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FlaskConical className="w-3 h-3" /> {pkg.testsCount} Parameters</span>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><User className="w-3 h-3" /> {pkg.recommendedFor}</span>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> {pkg.reportTime}</span>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Home className="w-3 h-3" /> Home Collection</span>
                                    </div>
                                </div>
                                <div className="mt-auto text-right">
                                    <div className="text-emerald-600 font-bold text-xl">₹{pkg.discountedPrice}</div>
                                    <div className="text-slate-400 line-through text-sm">₹{pkg.originalPrice}</div>
                                    <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold inline-block mt-1">{discount}% OFF</div>
                                    <button
                                        onClick={() => {
                                            setShowModal(true);
                                            setModalTest(pkg.name);
                                        }}
                                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-4 py-2 flex items-center gap-2 shadow transition mt-3 w-full"
                                    >
                                        <ClipboardList className="w-4 h-4" /> Book Package
                                    </button>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                                    <button
                                        onClick={() => setOpenPackage(openPackage === pkg.id ? null : pkg.id)}
                                        className="flex justify-between items-center w-full font-semibold text-pink-600"
                                    >
                                        <span>Tests Included ({pkg.testsCount})</span>
                                        <ChevronDown className={classNames("w-5 h-5 transition-transform", openPackage === pkg.id ? "rotate-180" : "")} />
                                    </button>
                                    <div
                                        className={classNames("grid grid-cols-2 gap-2 mt-2 transition-all overflow-hidden", openPackage === pkg.id ? "max-h-40" : "max-h-0")}
                                        style={{ transition: 'max-height 0.3s', maxHeight: openPackage === pkg.id ? 200 : 0 }}
                                    >
                                        {Array.isArray(pkg.tests) && pkg.tests.map((test, testIndex) => (
                                            <div key={`${pkg.id}-test-${testIndex}`} className="bg-white px-3 py-1 rounded text-xs text-blue-700 border border-blue-200">
                                                {test}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
};

export default DiagnosticTabs;
