"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const AppointmentModal = ({ doctorDetails, visible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: "",
    location: "",
    date: null,
    timeSlot: null
  });

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visible]);

  const generateTimeSlots = (selectedDate) => {
    if (!selectedDate) return [];
    
    const dayName = dayjs(selectedDate).format('dddd');
    const scheduleInfo = doctorDetails.schedule[dayName];
    
    if (!scheduleInfo) return [];

    const [startTime, endTime] = scheduleInfo.time.split(' - ');
    const slots = [];
    const currentTime = dayjs(selectedDate).format('YYYY-MM-DD ') + startTime;
    const endTimeStr = dayjs(selectedDate).format('YYYY-MM-DD ') + endTime;
    
    let current = dayjs(currentTime);
    const end = dayjs(endTimeStr);

    while (current.isBefore(end)) {
      slots.push({
        label: current.format('h:mm A'),
        value: current.format('HH:mm')
      });
      current = current.add(doctorDetails.timeslot, 'minute');
    }

    return slots;
  };

  const availableDates = Object.values(doctorDetails.schedule).map(info => info.date);

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
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Book Appointment with {doctorDetails.name}
          </h2>
          <p className="text-gray-600 mt-2">
            {doctorDetails.specialty} • {doctorDetails.locations[0]?.name}
          </p>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Doctor Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Doctor Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Location:</span>{" "}
                  {doctorDetails.locations[0]?.address}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Consultation Duration:</span>{" "}
                  {doctorDetails.timeslot} minutes
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Consultation Fee:</span> $25
                </p>
              </div>
            </div>

            {/* Right Column - Appointment Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Dates
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.date || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        date: e.target.value,
                        timeSlot: null,
                      }))
                    }
                  >
                    <option value="">Select a date</option>
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {dayjs(date).format("dddd, MMMM D, YYYY")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Slots */}
                {formData.date && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {generateTimeSlots(formData.date).map((slot) => (
                        <button
                          key={slot.value}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              timeSlot: slot.value,
                            }))
                          }
                          className={`p-2 text-sm rounded-md transition-colors ${
                            formData.timeSlot === slot.value
                              ? "bg-[#3DB8F5] text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!formData.date || !formData.timeSlot) {
                toast.error("Please select both date and time");
                return;
              }
              // Handle booking logic here
              toast.success("Appointment booked successfully!");
              onClose();
            }}
            disabled={!formData.date || !formData.timeSlot || isLoading}
            className="px-6 py-2 bg-[#3DB8F5] text-white rounded-md hover:bg-[#69b6ff] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal; 