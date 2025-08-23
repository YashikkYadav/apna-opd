"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Gym = ({ serviceData, totalItems }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // showing 6 gyms per page
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("Current Items:", currentItems);

  // Dummy actions for now
  const joinGym = (id) => {
    navigate.push(`/detail/Gym/${id}`);
  };

  const getRating = (gym) => {
    const averageRating = gym?.profiles[0]?.testimonials?.length
      ? gym?.profiles[0]?.testimonials?.reduce(
          (sum, t) => sum + t.rating,
          0
        ) / gym?.profiles[0]?.testimonials?.length
      : 0;
    return averageRating;
  }
  
  return (
    <main>
      <div className="mb-8 text-lg text-gray-600">
        {totalItems} Gyms Available
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems?.map((gym) => (
          <div
            key={gym?._id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-4 mb-4">
              {gym?.profiles?.[0]?.profilePhoto ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${gym?.profiles?.[0]?.profilePhoto}`}
                  alt={gym?.name[0] || "Gym Logo"}
                  width={50}
                  height={50}
                  className="rounded-full object-cover w-[55px] h-[55px]"
                />
              ) : (
                <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                  {gym?.name?.charAt(0) || "G"}
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                  {gym?.name || "Unnamed Gym"}

                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </h3>
                <div className="text-gray-600 text-sm">
                  {gym?.location || gym?.city || "No Location"}
                </div>
              </div>
            </div>

            {/* Trainers + Plans */}
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">No. of Trainers:</span>
                <span className="font-medium">
                  {gym?.profiles?.[0]?.noOfTrainers || "N/A"} + Certified
                  Trainers
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Plans:</span>
                <span className="font-medium">
                  {gym?.profiles?.[0]?.plans?.map((p) => p.name).join(", ") ||
                    "N/A"}
                </span>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-green-500">
              <div className="font-semibold text-sm text-gray-700 mb-1">
                Operating Hours
              </div>
              <div className="text-gray-600 text-xs">
                {`${
                  (parseInt(gym?.profiles?.[0]?.regularOpening) % 13) + 1 ||
                  "N/A"
                } AM - ${
                  (parseInt(gym?.profiles?.[0]?.regularClosing) % 13) + 1 ||
                  "N/A"
                } PM`}
              </div>
            </div>

            {/* Facilities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {gym?.profiles[0]?.worldFacilities?.length > 0 ? (
                gym?.profiles[0]?.worldFacilities?.map((facility, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {facility?.name || facility}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">
                  No facilities listed
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="text-yellow-500 text-sm">★★★★★</div>
              <span className="text-gray-600 text-sm">
                {getRating(gym) || "N/A"} (
                {gym?.profiles?.[0]?.testimonials?.length || 0} reviews)
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                onClick={() => joinGym(gym?._id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Gym;
