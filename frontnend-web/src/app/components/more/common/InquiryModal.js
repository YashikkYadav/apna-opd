"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const InquiryModal = ({ serviceData, serviceType, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      name: formData.name,
      phone: formData.phone,
      enquiry: formData.message,
    };
    console.log("serviceData", serviceData);
    console.log("payload", payload);
    try {
      const response = await axiosInstance.post(
        `/67dfe27f39b2fed61409c6a3/enquiry`,
        payload
      );
      console.log("response", response);
      if(response.enquiry){
        setSubmitSuccess(true);
      }
    } catch (error) {
      const errorMessage =
        typeof error?.response?.data === "string"
          ? error.response.data
          : error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Something went wrong. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
      });
    }
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const formatServiceType = (type) => {
    return type.replace(/-/g, ' ').replace(/_/g, ' ').split(' ').map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Inquiry for {serviceData?.title}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-600">
                Your inquiry has been submitted successfully. We will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md h-24"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#3DB8F5] text-white p-2 rounded-md hover:bg-[#69b6ff]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer hideProgressBar autoClose={1200}/>
    </div>
  );
};

export default InquiryModal;
