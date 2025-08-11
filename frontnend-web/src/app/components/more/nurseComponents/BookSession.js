'use client';
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from 'axios'

export default function FreeTrialModal({ isOpen, onClose }) {
    const params = useParams();
    const id = params.id;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [verified, setVerified] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [msg, setMsg] = useState("")

    useEffect(() => {
        if (isOpen) {
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setOtpSent(false);
            setOtp("");
            setGeneratedOtp("");
            setVerified(false);
            setSubmitted(false);
            setMsg("");
        }
    }, [isOpen]);

    const sendOtp = () => {
        if (!phone) return alert("Please enter your phone number.");
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(newOtp);
        setOtpSent(true);
        alert("Simulated OTP to +91" + phone + ": " + newOtp);
    };

    const verifyOtp = () => {
        if (otp === generatedOtp) {
            setVerified(true);
            setMsg("Phone Verified!");
        } else {
            setMsg("Invalid OTP. Please try again.");
        }
    };

    const handleSubmit = async () => {
        if (!verified) return setMsg("Please verify your phone number first.");
        if (!message || message.trim().length < 3) {
            return setMsg("Message must be at least 3 characters.");
        }

        setSubmitted(true);

        const payload = {
            name,
            phone,
            date: new Date().toISOString(),
            enquiry: message.trim(),
        };

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/enquiry/`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Submitted:", res.data);
        } catch (err) {
            console.error("Submission error:", err?.response?.data || err.message);
            setMsg("Something went wrong. Try again.");
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-200">
                {!submitted ? (
                    <>
                        <h2 className="text-2xl font-bold text-blue-700 mb-4">Book a Session</h2>

                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            className="w-full mb-3 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            className="w-full mb-3 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <textarea
                            placeholder="Message (required)"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className="w-full mb-3 px-4 py-2 border border-blue-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />

                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <button
                                onClick={sendOtp}
                                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Send OTP
                            </button>
                        </div>

                        {otpSent && (
                            <div className="mb-3">
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <button
                                        onClick={verifyOtp}
                                        className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Verify
                                    </button>
                                </div>
                                {msg && (
                                    <p className={`text-sm font-medium ${msg === "Phone Verified!" ? "text-green-600" : "text-red-600"}`}>
                                        {msg}
                                    </p>
                                )}
                            </div>
                        )}

                        <button
                            disabled={!verified}
                            onClick={handleSubmit}
                            className={`w-full py-2 rounded-lg text-white font-semibold ${verified
                                ? "bg-blue-600 hover:bg-blue-700 transition"
                                : "bg-blue-300 cursor-not-allowed"
                                }`}
                        >
                            Submit
                        </button>

                        <button onClick={onClose} className="mt-4 text-sm text-blue-600 underline">
                            Cancel
                        </button>
                    </>
                ) : (
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-bold text-blue-700">Thank you!</h2>
                        <p className="text-gray-600">
                            Thanks for booking the Session. We’ll update you further.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
