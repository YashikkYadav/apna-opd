'use client';
import React, { useState, useEffect } from "react";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns";
import { useParams } from "next/navigation";
import axios from "axios";

export function getDateOptions() {
    const today = new Date();
    const todayLabel = format(today, "MMM d");

    const tomorrow = addDays(today, 1);
    const tomorrowLabel = format(tomorrow, "MMM d");

    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    const weekLabel = `${format(weekStart, "MMM d")}-${format(weekEnd, "MMM d")}`;

    return [
        { label: "Today", sub: todayLabel },
        { label: "Tomorrow", sub: tomorrowLabel },
        { label: "This Week", sub: weekLabel },
    ];
}

export default function BookAppointment({ isOpen, onClose, doctorData }) {
    const params = useParams();
    const id = params.doctorId;

    const [selectedDate, setSelectedDate] = useState("Today");
    const [selectedTime, setSelectedTime] = useState("02:00 PM");
    const [selectedMode, setSelectedMode] = useState("In-person");
    const [paymentOption, setPaymentOption] = useState("");
    const [loading, setLoading] = useState(false);

    // 👇 new states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [success, setSuccess] = useState(false);

    const dates = getDateOptions();
    const timeSlots = ["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"];
    const modes = ["online", "offline"];
    const paymentMethods = ["UPI", "Card", "Wallet"];

    useEffect(() => {
        if (isOpen) {
            setSelectedDate("Today");
            setSelectedTime("02:00 PM");
            setSelectedMode("In-person");
            setPaymentOption("");
            setName("");
            setEmail("");
            setPhone("");
            setSuccess(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBookAppointment = async () => {
        if (!name || !email || !phoneNumber) {
            alert("Name, Email, and Phone are required!");
            return;
        }
        try {
            setLoading(true);

            const payload = {
                location: doctorData?.doctorId?.location,
                date: new Date(),
                time: selectedTime,
                type: selectedMode,
                name,
                email,
                phoneNumber,
            };

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/appointment/${id}/book-appointment`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.status !== 201 && res.status !== 200) {
                alert(res.data?.error || "Failed to book appointment");
            } else {
                setSuccess(true); // 👈 switch to Thank You page
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Thank You Page
    if (success) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h2>
                    <p className="text-gray-700 mb-6">
                        Your appointment has been booked successfully.
                        We’ll contact you soon with confirmation details.
                    </p>
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    // 👇 Original booking form
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-5xl border border-blue-200 mt-[350px]">
                <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-500 pb-2 mb-6">
                    Book Appointment
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Patient Info</h3>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mb-3 px-4 py-2 border rounded-lg text-black"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mb-3 px-4 py-2 border rounded-lg text-black"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full mb-6 px-4 py-2 border rounded-lg text-black"
                        />

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
                        <div className="bg-gray-50 p-4 rounded-lg mb-6 mt-7">
                            <h4 className="font-semibold text-gray-800 mb-1">Consultation Fee</h4>
                            <div className="text-blue-600 text-2xl font-bold">{doctorData?.appointmentFee}</div>
                            <p className="text-sm text-gray-600">
                                Includes follow-up consultation within 7 days
                            </p>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-800 mb-2">Clinic Details</h4>
                            <ul className="text-gray-700 text-sm space-y-1">
                                <li>
                                    ☐ {doctorData?.doctorId?.clinicName}, {doctorData?.doctorId?.address},{" "}
                                    {doctorData?.doctorId?.city}
                                </li>
                                <li>☐ Mon-Sat: 9:00 AM - 7:00 PM</li>
                                <li>☐ +91 {doctorData?.doctorId?.phoneNumber}</li>
                            </ul>
                        </div>

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

                        <button
                            onClick={handleBookAppointment}
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50"
                        >
                            {loading ? "Booking..." : "Book Appointment"}
                        </button>
                    </div>
                </div>

                <div className="mt-4 text-right">
                    <button onClick={onClose} className="text-sm text-blue-600 underline">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
