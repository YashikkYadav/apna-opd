import React, {useState} from "react";
import BookSession from "./BookSession";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Available: "bg-green-100 text-green-800 border-green-200",
    Busy: "bg-red-100 text-red-800 border-red-200",
    Maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
        statusConfig[status] || statusConfig.Available
      }`}
    >
      {status}
    </span>
  );
};

const AmbulanceIcon = ({ type }) => {
  const icons = {
    "Basic Life Support (BLS)": "🚑",
    "Advanced Life Support (ALS)": "🏥",
    "Patient Transport": "🚐",
  };

  return (
    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-3xl shadow-lg">
      {icons[type] || "🚑"}
    </div>
  );
};

// const StarRating = ({ rating }) => {
//   return (
//     <div className="flex items-center gap-1">
//       {[...Array(5)].map((_, i) => (
//         <span
//           key={i}
//           className={`text-sm ${
//             i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
//           }`}
//         >
//           ⭐
//         </span>
//       ))}
//       <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
//     </div>
//   );
// };

export default function AmbulanceDetails({ healthProfile }) {
  const ambulances = healthProfile?.ambulances || [];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pt-12 rounded-3xl shadow-lg p-6 md:p-12">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
            Emergency Ambulance Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl ">
            Choose from our fleet of professional ambulances equipped with
            modern medical equipment and certified medical staff.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {ambulances.length}
                </p>
                <p className="text-gray-600">Total Ambulances</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">🚑</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {
                    ambulances.filter(
                      (a) => a.availabilityStatus === "Available"
                    ).length
                  }
                </p>
                <p className="text-gray-600">Available Now</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.min(...ambulances.map((a) => parseInt(a.responseTime)))}{" "}
                  min
                </p>
                <p className="text-gray-600">Fastest Response</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambulances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ambulances.map((ambu, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <AmbulanceIcon type={ambu.vehicleType} />
                  <StatusBadge status={ambu.availabilityStatus} />
                </div>

                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-gray-800">
                    {ambu.vehicleType}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Pricing */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Per KM</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{ambu.charges.perKmRate}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Waiting/Hour</p>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{ambu.charges.waitingCharge}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Response Time</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {ambu.responseTime} mins
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Vehicle No.</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {ambu.vehicleNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">
                      Registration No.
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {ambu.registrationNo}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Insurance No.</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {ambu.insuranceNo}
                    </span>
                  </div>
                </div>

                {/* Equipment */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Medical Equipment
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ambu.equipment.map((item, equipIdx) => (
                      <span
                        key={equipIdx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3 px-6 rounded-2xl font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                >
                  Book Now
                </button>
                <BookSession
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
