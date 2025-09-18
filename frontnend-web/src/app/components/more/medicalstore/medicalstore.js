"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsGridFill, BsList } from "react-icons/bs";
import Pagination from "../common/Pagination";
import WhyChooseUs from "./whyChoose";
import PatientTestimonials from "./Testimonial";

const MedicalStore = ({
  serviceData,
  totalItems,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const [storeList, setStoreList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [viewMode, setViewMode] = useState("grid");
  const router = useRouter();

  useEffect(() => {
    if (serviceData) {
      setStoreList(serviceData);
      setFilteredList(serviceData);
    }
  }, [serviceData]);

  // Pagination
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  const getRating = (store) => {
    const testimonials = store?.profiles?.[0]?.testimonials || [];
    if (!testimonials.length) return null;
    const avg =
      testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) /
      testimonials.length;
    return avg.toFixed(1);
  };

  const viewDetails = (id) => {
    console.log("View Details for Store:", id);
    router.push(`/detail/medical_store/${id}`);
  };

  return (
    <>
      <main>
        <div className="mb-8 text-lg text-gray-600 flex items-center justify-between mt-5">
          <span>{totalItems} Medical Stores Available</span>
          {/* View mode toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg border ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <BsGridFill size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg border ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <BsList size={18} />
            </button>
          </div>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {currentItems?.length === 0 ? (
            <div
              className={`w-full ${
                viewMode === "grid" ? "lg:ml-96" : ""
              } text-center py-16 text-xl text-gray-500 font-semibold`}
            >
              No medical stores found for your search.
            </div>
          ) : (
            currentItems?.map((store) => (
              <div
                key={store?._id}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                }`}
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-4">
                  {store?.profiles?.[0]?.profilePhoto ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${store?.profiles?.[0]?.profilePhoto}`}
                      alt={store?.name || "Medical Store"}
                      width={50}
                      height={50}
                      className="rounded-full object-cover w-[55px] h-[55px]"
                    />
                  ) : (
                    <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                      {store?.name?.charAt(0) || "M"}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">
                      {store?.name || "Unnamed Store"}
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold ml-5">
                        Verified
                      </span>
                    </h3>
                    <div className="text-gray-600 text-sm">
                      {store?.location || store?.city || "No Location"}
                    </div>
                  </div>
                </div>

                {/* Experience + Partnerships */}
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">
                      {store?.profiles?.[0]?.experience || "N/A"}+ Years of
                      Experience
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Partnerships:</span>
                    <span className="font-medium">
                      {store?.profiles?.[0]?.partnerships?.join(", ") || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {store?.profiles[0]?.tags?.length > 0 ? (
                    store?.profiles[0]?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No tags listed
                    </span>
                  )}
                </div>

                {/* Opening & Closing Time */}
                <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-blue-500">
                  <div className="font-semibold text-sm text-gray-700 mb-1">
                    Opening & Closing Time
                  </div>
                  <div className="text-gray-600 text-xs">
                    {`${
                      parseInt(store?.profiles?.[0]?.openTime) % 13 || 10
                    } AM`}{" "}
                    -{" "}
                    {`${
                      parseInt(store?.profiles?.[0]?.closeTime) % 13 || 7
                    } PM`}
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-4 text-sm text-gray-700 space-y-1">
                  <div>
                    <span className="font-medium">Phone:</span>{" "}
                    {store?.phone || "N/A"}
                  </div>
                  {store?.profiles?.[0]?.website && (
                    <div>
                      <span className="font-medium">Website:</span>{" "}
                      <a
                        href={store?.profiles?.[0]?.website}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {store?.profiles?.[0]?.website}
                      </a>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-yellow-500 text-sm">★★★★★</div>
                  <span className="text-gray-600 text-sm">
                    {getRating(store) || "N/A"} (
                    {store?.profiles?.[0]?.testimonials?.length || 0} reviews)
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    onClick={() => viewDetails(store?._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <WhyChooseUs />
      <PatientTestimonials />
    </>
  );
};

export default MedicalStore;
