"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ClipboardList,
  Clock,
  FlaskConical,
  Home,
  Star,
  User,
  ChevronDown,
} from "lucide-react";
import classNames from "classnames";
import BookTest from "./BookTests";

const TestPackages = ({ packagesData, openPackage, setOpenPackage }) => {
  const [modalOpenPkg, setModalOpenPkg] = useState(false);

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
          Tests Packages
        </button>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
      {packagesData.map((pkg) => {
        const discount = Math.round(
          (1 - pkg.discountedPrice / pkg.originalPrice) * 100
        );
        return (
          <motion.div
            key={pkg._id}
            whileHover={{ scale: 1.02 }}
            className="bg-[#F7F9FB] rounded-2xl p-6 shadow-md border border-blue-200 hover:border-blue-500 transition-all flex flex-col"
          >
            <div className="mb-3">
              <h3 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                {pkg.name}{" "}
                {pkg.popular && <Star className="w-4 h-4 text-yellow-500" />}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <FlaskConical className="w-3 h-3" /> {pkg.testsCount}{" "}
                  Parameters
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <User className="w-3 h-3" /> {pkg.recommendedFor}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {pkg.reportTime}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Home className="w-3 h-3" /> Home Collection
                </span>
              </div>
            </div>

            <div className="mt-auto text-right">
              <div className="text-emerald-600 font-bold text-xl">
                ₹{pkg.price}
              </div>
              <button
                onClick={() => setModalOpenPkg(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-4 py-2 flex items-center gap-2 shadow transition mt-3 w-full"
              >
                <ClipboardList className="w-4 h-4" /> Book Package
              </button>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mt-4">
              <button
                onClick={() =>
                  setOpenPackage(openPackage === pkg._id ? null : pkg._id)
                }
                className="flex justify-between items-center w-full font-semibold text-pink-600"
              >
                <span>Tests Included ({pkg.details.split(",").length})</span>
                <ChevronDown
                  className={classNames(
                    "w-5 h-5 transition-transform",
                    openPackage === pkg._id ? "rotate-180" : ""
                  )}
                />
              </button>
              <div
                className={classNames(
                  "grid grid-cols-2 gap-2 mt-2 transition-all overflow-auto",
                  openPackage === pkg._id ? "max-h-40" : "max-h-0"
                )}
                style={{
                  transition: "max-height 0.3s",
                  maxHeight: openPackage === pkg._id ? 200 : 0,
                }}
              >
                {Array.isArray(pkg.details.split(",")) &&
                  pkg.details.split(",").map((test, testIndex) => (
                    <div
                      key={`${pkg._id}-test-${testIndex}`}
                      className="bg-white px-3 py-1 rounded text-xs text-blue-700 border border-blue-200"
                    >
                      {test}
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        );
      })}
      <BookTest isOpen={modalOpenPkg} onClose={() => setModalOpenPkg(false)} />
    </div>
    </motion.div>
  );
};

export default TestPackages;
