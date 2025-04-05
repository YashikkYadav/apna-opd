"use client";
import { useState } from "react";
import { Modal, Input, Select, DatePicker, TimePicker, message, Radio } from "antd";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";

const AppointmentModal = ({ doctorDetails, visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: "",
    location: "",
    date: null,
    timeSlot: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      message.success("OTP sent successfully!");
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (formData.otp !== "1234") {
      message.error("Invalid OTP. Please try again.");
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
      message.success("OTP verified successfully!");
    }, 1000);
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date, timeSlot: null }));
    // Simulate fetching available slots
    const slots = generateTimeSlots(date);
    setAvailableSlots(slots);
  };

  const generateTimeSlots = (date) => {
    // This is a mock function to generate time slots
    // In a real application, this would come from an API
    const day = dayjs(date).format('dddd');
    const schedule = doctorDetails.schedule[day];
    
    if (!schedule) return [];

    const [start, end] = schedule.split(' - ');
    const startTime = dayjs(date).hour(parseInt(start.split(' ')[0]));
    const endTime = dayjs(date).hour(parseInt(end.split(' ')[0]));
    
    const slots = [];
    let currentTime = startTime;

    while (currentTime.isBefore(endTime)) {
      slots.push({
        label: currentTime.format('h:mm A'),
        value: currentTime.format('HH:mm')
      });
      currentTime = currentTime.add(15, 'minute');
    }

    return slots;
  };

  const handleBookAppointment = async () => {
    if (!formData.location || !formData.date || !formData.timeSlot) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate appointment booking
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Appointment booked successfully!");
      onClose();
    }, 1000);
    setCurrentStep(1);
    setFormData({
      name: "",
      phone: "",
      otp: "",
      location: "",
      date: null,
      timeSlot: null
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSendOTP}
              disabled={!formData.name || !formData.phone}
              className="bg-[#3DB8F5] text-white px-4 py-2 rounded-md hover:bg-[#69b6ff]"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Enter OTP"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
            />
            <button
              onClick={handleVerifyOTP}
              disabled={!formData.otp}
              className="bg-[#3DB8F5] text-white px-4 py-2 rounded-md hover:bg-[#69b6ff]"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4">
            <Select
              placeholder="Select Location"
              options={doctorDetails?.locations?.map(loc => ({ value: loc, label: loc }))}
              onChange={value => setFormData(prev => ({ ...prev, location: value }))}
            />
            <DatePicker
              placeholder="Select Date"
              disabledDate={(current) => current && current < dayjs().startOf('day')}
              onChange={handleDateChange}
            />
            {formData.date && availableSlots.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Available Time Slots:</p>
                <Radio.Group
                  onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
                  value={formData.timeSlot}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <Radio.Button
                        key={slot.value}
                        value={slot.value}
                        className="text-center"
                      >
                        {slot.label}
                      </Radio.Button>
                    ))}
                  </div>
                </Radio.Group>
              </div>
            )}
            {formData.date && availableSlots.length === 0 && (
              <p className="text-sm text-red-500">No available slots for this date</p>
            )}
            <button
              onClick={handleBookAppointment}
              disabled={!formData.location || !formData.date || !formData.timeSlot}
              className="bg-[#3DB8F5] text-white px-4 py-2 rounded-md hover:bg-[#69b6ff]"
            >
              {isLoading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={`Book Appointment with ${doctorDetails?.name}`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <div className="flex flex-col gap-4">
        {renderStepContent()}
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="text-[#3DB8F5] hover:text-[#69b6ff]"
          >
            Back
          </button>
        )}
      </div>
      <ToastContainer hideProgressBar={true} autoClose={1500}/>
    </Modal>
  );
};

export default AppointmentModal; 