'use client';
import React, { useState, useEffect } from "react";

export default function BookAppointment({ isOpen, onClose }) {
    const [selectedDate, setSelectedDate] = useState("Today");
    const [selectedTime, setSelectedTime] = useState("02:00 PM");
    const [selectedMode, setSelectedMode] = useState("In-person");
    const [paymentOption, setPaymentOption] = useState("");

    const dates = [
        { label: "Today", sub: "Jun 17" },
        { label: "Tomorrow", sub: "Jun 18" },
        { label: "This Week", sub: "Jun 19-23" },
    ];

    const timeSlots = [
        "09:00 AM", "10:30 AM", "02:00 PM",
        "03:30 PM", "05:00 PM", "06:30 PM"
    ];

    const modes = ["In-person", "Video Call", "Home Visit"];
    const paymentMethods = ["UPI", "Card", "Wallet"];

    useEffect(() => {
        if (isOpen) {
            setSelectedDate("Today");
            setSelectedTime("02:00 PM");
            setSelectedMode("In-person");
            setPaymentOption("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-5xl border border-blue-200">
                <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-500 pb-2 mb-6">
                    Book Appointment
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                        {/* Dates */}
                        <h3 className="font-semibold text-gray-800 mb-3">Select Date</h3>
                        <div className="flex gap-3 mb-6">
                            {dates?.map((d) => (
                                <button
                                    key={d?.label}
                                    onClick={() => setSelectedDate(d?.label)}
                                    className={`px-4 py-3 rounded-lg border text-center min-w-[110px] ${selectedDate === d?.label
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
                                        }`}
                                >
                                    <div className="font-medium">{d?.label}</div>
                                    <div className="text-sm">{d?.sub}</div>
                                </button>
                            ))}
                        </div>

                        {/* Time Slots */}
                        <h3 className="font-semibold text-gray-800 mb-3">Available Time Slots</h3>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {timeSlots?.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedTime(t)}
                                    className={`px-4 py-2 rounded-lg border text-center ${selectedTime === t
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        {/* Consultation Mode */}
                        <h3 className="font-semibold text-gray-800 mb-3">Consultation Mode</h3>
                        <div className="flex gap-3">
                            {modes?.map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setSelectedMode(m)}
                                    className={`px-4 py-2 rounded-lg border ${selectedMode === m
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        {/* Fee */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <h4 className="font-semibold text-gray-800 mb-1">Consultation Fee</h4>
                            <div className="text-blue-600 text-2xl font-bold">₹500</div>
                            <p className="text-sm text-gray-600">
                                Includes follow-up consultation within 7 days
                            </p>
                        </div>

                        {/* Clinic Details */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-800 mb-2">Clinic Details</h4>
                            <ul className="text-gray-700 text-sm space-y-1">
                                <li>☐ Apollo Hospital, Sector 26, Noida</li>
                                <li>☐ Mon-Sat: 9:00 AM - 7:00 PM</li>
                                <li>☐ +91 98765 43210</li>
                            </ul>
                        </div>

                        {/* Payment Options */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-800 mb-2">Payment Options</h4>
                            <div className="flex gap-3">
                                {paymentMethods?.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPaymentOption(p)}
                                        className={`px-4 py-2 rounded-lg border ${paymentOption === p
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Proceed Button */}
                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition">
                           Proceed to Payment
                        </button>
                    </div>
                </div>

                {/* Close Button */}
                <div className="mt-4 text-right">
                    <button onClick={onClose} className="text-sm text-blue-600 underline">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
