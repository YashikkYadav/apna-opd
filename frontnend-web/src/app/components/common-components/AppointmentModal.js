"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import axiosInstance from "@/app/config/axios";

const AppointmentModal = ({ doctorDetails, visible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    location: "",
    locationId: "",
    date: "",
    time: "",
    type: "Regular",
    appointmentType: "",
  });

  const appointmentTypes = [
    {
      value: "online",
      label: "Online",
    },
    {
      value: "offline",
      label: "Offline",
    },
  ];

  useEffect(() => {
    console.log(doctorDetails);
    if (visible) {
      document.body.style.overflow = "hidden";
      fetchLocations();
    } else {
      document.body.style.overflow = "unset";
      setFormData({
        phoneNumber: "",
        location: "",
        locationId: "",
        date: "",
        time: "",
        type: "Regular",
      });
      setAvailableDates([]);
      setTimeSlots([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible, doctorDetails.doctorId]);

  const fetchLocations = async () => {
    try {
      setIsLoading(true);
      const { locations } = await axiosInstance.get(
        `/appointment/${doctorDetails.doctorId._id}/locations`
      );
      if (locations) {
        setLocations(locations);
      }
    } catch (error) {
      toast.error(error?.response || "Failed to fetch locations");
      console.log("Error fetching locations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDates = async (locationId) => {
    try {
      setIsLoading(true);
      const { dates } = await axiosInstance.get(
        `/appointment/${doctorDetails.doctorId._id}/${locationId}/dates`
      );
      if (dates) {
        setAvailableDates(dates);
      }
    } catch (error) {
      toast.error(error?.response || "Failed to fetch available dates");
      console.log("Error fetching dates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTimeSlots = async (locationId, date) => {
    try {
      setIsLoading(true);
      const { timeSlots } = await axiosInstance.get(
        `/appointment/${doctorDetails.doctorId._id}/${locationId}/date/${date}`
      );
      if (timeSlots) {
        setTimeSlots(timeSlots);
      }
    } catch (error) {
      toast.error(error?.response || "Failed to fetch time slots");
      console.log("Error fetching time slots:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationChange = async (e) => {
    const selectedLocation = locations.find(
      (loc) => loc._id === e.target.value
    );
    console.log(e.target.value);
    setFormData((prev) => ({
      ...prev,
      locationId: e.target.value,
      location: selectedLocation?.address || "",
      date: "",
      time: "",
    }));
    setTimeSlots([]);
    if (e.target.value) {
      await fetchDates(e.target.value);
    } else {
      setAvailableDates([]);
    }
  };

  const handleDateChange = async (e) => {
    setFormData((prev) => ({
      ...prev,
      date: e.target.value,
      time: "",
    }));
    console.log(formData.locationId);
    if (e.target.value && formData.locationId) {
      await fetchTimeSlots(formData.locationId, e.target.value);
    } else {
      setTimeSlots([]);
    }
  };

  const handleAppointmentTypeChange = async (e) => {
    setFormData((prev) => ({ ...prev, appointmentType: e.target.value }));
    await fetchLocations();
    if (e.target.value === "online") {
      await fetchDates(locations[0]._id);
    } else {
      setAvailableDates([]);
    }
    console.log(e.target.value);
  };

  useEffect(() => {
    if (formData.appointmentType === "online" && formData.locationId === "") {
      setFormData((prev) => ({
        ...prev,
        locationId: locations[0]._id,
        location: locations[0]?.address,
      }));
    }
  }, [formData]);

  const handleSubmit = async () => {
    if (
      !formData.phoneNumber ||
      (formData.appointmentType === "online" && !formData.email) ||
      !formData.date ||
      !formData.location ||
      !formData.time ||
      !formData.appointmentType
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      setIsLoading(true);
      let response;
      if (formData.appointmentType === "offline") {
        response = await axiosInstance.post(
          `/appointment/${doctorDetails.doctorId._id}/book-appointment`,
          {
            phoneNumber: formData.phoneNumber,
            date: formData.date,
            location: formData.location,
            time: formData.time,
            type: formData.type,
            appointmentType: formData.appointmentType,
          }
        );
      } else {
        response = await axiosInstance.post(
          `/appointment/${doctorDetails.doctorId._id}/book-appointment`,
          {
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            date: formData.date,
            location: formData.location,
            time: formData.time,
            type: formData.type,
            appointmentType: formData.appointmentType,
          }
        );
      }
      console.log(response.appointment.paymentLink);

      toast.success("Appointment booked successfully!");
      onClose();

      setTimeout(() => {
        window.location.href = response.appointment.paymentLink;
      }, 2000);
    } catch (error) {
      toast.error(
        error?.response?.data || error?.response || "Failed to book appointment"
      );
      console.log("Error booking appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity h-full"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg w-full max-w-3xl mx-4 p-8 shadow-xl max-h-[80%] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="border-b mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Book Appointment with {doctorDetails.name}
          </h2>
          <p className="text-gray-600 mt-2">{doctorDetails.specialty}</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Appointment Type
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={formData.appointmentType}
              onChange={handleAppointmentTypeChange}
              disabled={isLoading}
            >
              <option value="">Select a type</option>
              {appointmentTypes?.map((type, index) => (
                <option key={index + "_" + type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {}
          {formData.appointmentType === "offline" ? (
            /* Phone Number */
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                "Phone Number*
              </label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </div>
          ) : (
            formData.appointmentType && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    "Phone Number*
                  </label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Id
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your email id"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              </>
            )
          )}

          {/* Location Selection */}
          {formData.appointmentType === "offline" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Location*
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.locationId}
                onChange={handleLocationChange}
                disabled={isLoading}
              >
                <option value="">Select a location</option>
                {locations?.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.name} - {location.address}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date Selection */}
          {availableDates?.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date*
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.date}
                onChange={handleDateChange}
                disabled={isLoading}
              >
                <option value="">Select a date</option>
                {availableDates?.map((date) => (
                  <option key={date} value={date}>
                    {dayjs(date).format("dddd, MMMM D, YYYY")}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Time Slots */}
          {timeSlots?.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time*
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots?.map((slot) => (
                  <button
                    key={slot}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, time: slot }))
                    }
                    disabled={isLoading}
                    className={`p-2 text-sm rounded-md transition-colors ${
                      formData.time === slot
                        ? "bg-[#3DB8F5] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t mt-6 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              (formData.appointmentType === "offline" &&
                !formData.phoneNumber) ||
              (formData.appointmentType === "online" && !formData.email) ||
              !formData.date ||
              !formData.location ||
              !formData.time
            }
            className="px-6 py-2 bg-[#3DB8F5] text-white rounded-md hover:bg-[#69b6ff] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Booking..." : "Book Appointment"}
          </button>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3DB8F5]"></div>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1800}
        hideProgressBar={true}
      />
    </div>
  );
};

export default AppointmentModal;
