"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ClipboardList,
  Clock,
  FileText,
  FlaskConical,
  Home,
  User,
} from "lucide-react";
import BookSession from "../common/BookSession";

const IndividualTests = ({ filteredTests }) => {
  const [modalOpenTest, setModalOpenTest] = useState(false);

  return (
    <motion.div
      id="labPackagesSection"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Tab Navigation */}
      <div className="flex border-b-2 border-blue-200 mb-8">
        <button className="px-6 py-3 font-semibold text-lg border-b-4 transition-all rounded-t-2xl border-pink-500 text-pink-600 bg-pink-100">
          Individual Tests
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredTests?.map((test) => {
          const discount = Math.round(
            (1 - test.discountedPrice / test.originalPrice) * 100
          );
          return (
            <motion.div
              key={test._id}
              whileHover={{ scale: 1.02 }}
              className="bg-[#F7F9FB] rounded-2xl p-6 shadow-md border border-blue-200 hover:border-blue-500 transition-all flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-blue-700 mb-1">
                    {test.name}
                  </h3>
                  {test.popular && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                      Popular
                    </span>
                  )}
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 text-white text-xl">
                  {test.icon}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4" /> {test.sampleType}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {test.reportTime}
                </div>
                <div className="flex items-center gap-2">
                  {test.homeCollection ? (
                    <Home className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  {test.homeCollection ? "Home Collection" : "Lab Visit"}
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Digital Report
                </div>
              </div>

              <div className="mt-auto pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold text-lg">
                    ₹{test.fee}
                  </span>
                </div>
                <button
                  onClick={() => setModalOpenTest(true)}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-4 py-2 flex items-center gap-2 shadow transition"
                >
                  <ClipboardList className="w-4 h-4" /> Book Test
                </button>
              </div>
            </motion.div>
          );
        })}
        <BookSession
          isOpen={modalOpenTest}
          onClose={() => setModalOpenTest(false)}
          title="Book a Test"
        />
      </div>
    </motion.div>
  );
};

export default IndividualTests;
