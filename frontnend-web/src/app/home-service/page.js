"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBarForServices from "../components/common-components/SearchBarForServices";

import { FaStar } from "react-icons/fa";
import Pagination from "../components/more/common/Pagination";

const HomeServices = () => {
  const [profileList, setProfileList] = useState([]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const searchParams = useSearchParams();
  const itemsPerPage = 6;
  const router = useRouter();

  const fetchData = async (locationQuery = "", nameQuery = "") => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/home-services?location=${locationQuery}&name=${nameQuery}`
      );
      const json = await res.json();
      console.log("Fetched Home Services:", json);
      setProfileList(json || []);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    const locationQuery = searchParams.get("location") || "";
    const nameQuery = searchParams.get("name") || "";
    setLocation(locationQuery);
    setName(nameQuery);

    fetchData(locationQuery, nameQuery);
  }, []);

  // Pagination logic (client side)
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = profileList?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(profileList?.length / itemsPerPage);

  // Helper function to get rating
  const getRating = (service) => {
    return parseFloat(service?.profile?.rating) || 0;
  };

  // Helper function to view service details
  const viewServiceDetails = (serviceId, type) => {
    // Implement navigation logic here
    console.log("View details for service:", serviceId);
    if (type === "nursing_staff") type = "nursingStaff";
    router.push(`/detail/${type}/${serviceId}`);
  };

  const handleSearch = (locationQuery, name) => {
    if (!locationQuery && !name) {
      router.push(`/home-service`);
      fetchData("", "");
      return;
    }
    let query = `/home-service?`;
    if (locationQuery) query += `location=${locationQuery}&`;
    if (name) query += `name=${name}`;
    router.push(query);
    fetchData(locationQuery, name);
  };

  return (
    <div className="pt-[90px] md:pt-[112px] p-3 md:p-8 bg-sky-50">
      <div>
        <SearchBarForServices
          onSearch={handleSearch}
          location={location}
          name={name}
        />
      </div>

      <main className="py-5 px-1">
        <div className="mb-8 text-lg text-gray-600 flex items-center justify-between mt-5">
          <span>{profileList?.length} Home Services Available</span>
          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg border ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <rect x="2" y="2" width="6" height="6" rx="1.5" />
                <rect x="10" y="2" width="6" height="6" rx="1.5" />
                <rect x="2" y="10" width="6" height="6" rx="1.5" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg border ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <rect x="2" y="4" width="14" height="2" rx="1" />
                <rect x="2" y="8" width="14" height="2" rx="1" />
                <rect x="2" y="12" width="14" height="2" rx="1" />
              </svg>
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
              No home service providers found.
            </div>
          ) : (
            currentItems?.map((service) => {
              const profile = service?.profile;
              return (
                <div
                  key={service?._id}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                  }`}
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4 mb-4">
                    {profile?.profileImage ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile?.profileImage}`}
                        alt={service?.name || "Home Service Provider"}
                        width={55}
                        height={55}
                        className="rounded-full object-cover w-[55px] h-[55px]"
                      />
                    ) : (
                      <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                        {service?.name?.charAt(0) || "S"}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">
                        {service?.name || "Unnamed Service Provider"}
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold ml-5">
                          Verified
                        </span>
                      </h3>
                      <div className="text-gray-600 text-sm">
                        {service?.location ||
                          service?.city ||
                          service?.state ||
                          "No Location"}
                      </div>
                    </div>
                  </div>

                  {/* Experience + Contact */}
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">
                        {profile?.experience || "N/A"}+ years
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Home Service:</span>
                      <span
                        className={`font-medium ${
                          service?.homeService === "yes"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {service?.homeService === "yes"
                          ? "✅ Available"
                          : "❌ Not Available"}
                      </span>
                    </div>
                  </div>

                  {/* Services */}
                  {profile?.services?.length > 0 && (
                    <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-green-500">
                      <div className="font-semibold text-sm text-gray-700 mb-1">
                        Services
                      </div>
                      <div className="text-gray-600 text-xs line-clamp-3">
                        {profile?.services?.length > 0
                          ? profile?.services?.slice(0, 5)?.join(", ")
                          : "No services listed"}
                      </div>
                    </div>
                  )}

                  {/* Condition Treated */}
                  {profile?.conditionsTreated?.length > 0 && (
                    <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-green-500">
                      <div className="font-semibold text-sm text-gray-700 mb-1">
                        Conditions Treated
                      </div>
                      <div className="text-gray-600 text-xs line-clamp-3">
                        {profile?.conditionsTreated?.length > 0
                          ? profile?.conditionsTreated?.slice(0, 5)?.join(", ")
                          : "No conditions listed"}
                      </div>
                    </div>
                  )}
                  {/* Specializations/Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile?.specializations?.length > 0 ? (
                      profile?.specializations
                        .slice(0, 4)
                        .map((spec, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {spec}
                          </span>
                        ))
                    ) : (
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                        {service?.type || "Healthcare Service"}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(getRating(service))
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {getRating(service)
                        ? getRating(service).toFixed(1)
                        : "N/A"}{" "}
                      ({profile?.testimonials?.length || 0} reviews)
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                      onClick={() => viewServiceDetails(service?._id, service?.type)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeServices;
