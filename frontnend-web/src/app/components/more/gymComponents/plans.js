'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell } from 'react-icons/fa';

const MembershipPlans = ({healthProfile, data
}) => {
    


    return (
        <motion.section
            id="plansSection"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            <div className="mb-8 text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex justify-start items-center gap-3">
                    <FaDumbbell className="text-3xl text-blue-700" />
                    Choose Your Membership Plan
                </h2>
                <p className="text-lg text-blue-600 mt-2">
                    Flexible pricing options to suit your fitness journey
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthProfile?.plans?.map((plan, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04 }}
                        className={`relative p-6 rounded-2xl shadow-md border border-blue-100 flex flex-col justify-between transition-all
                            ${plan.popular
                                ? "bg-blue-700 text-white"
                                : "bg-white text-blue-800"}
                        `}
                    >
                        {plan.popular && (
                            <span className="absolute -top-3 right-4 bg-white text-blue-700 text-xs px-3 py-1 rounded-full font-bold shadow">
                                Most Popular
                            </span>
                        )}

                        <h3 className="text-xl font-bold mb-3 text-center">{plan.name}</h3>

                        <p className="text-3xl font-extrabold text-center mb-4">
                            ₹ {plan.price}
                        </p>

                        <ul className={`text-sm mb-6 space-y-2 ${plan.popular ? 'text-white/90' : 'text-blue-700/90'}`}>
                            {plan.features.map((feature, i) => (
                                <li key={i}>✓ {feature}</li>
                            ))}
                        </ul>

                        <button
                            className={`mt-auto rounded-full py-2.5 px-6 text-lg font-bold w-full transition
                                ${plan.popular
                                    ? "bg-white text-blue-700 hover:bg-blue-100"
                                    : "bg-blue-600 text-white hover:bg-blue-700"}
                            `}
                        >
                            Choose Plan
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default MembershipPlans;
