"use client";
import { Form, Input } from "antd";
import Image from "next/image";
import { useState } from "react";

const FAQ = () => {
    const [activeIndexes, setActiveIndexes] = useState([]);

    const data = [
        {
            title: "General FAQ",
            list: [
                { question: "What is Apna OPD and how does it work?", answer: "Apna OPD is an online doctor consultation platform that helps users across India find doctors online and book appointments instantly from their mobile devices." },
                { question: "Can I consult a doctor online anytime?", answer: "Yes, Apna OPD offers flexible scheduling. Many doctors are available for consultation during extended hours, including evenings and weekends." },
                { question: "Are the doctors on Apna OPD verified?", answer: "Absolutely. All doctors listed on our platform are verified professionals with valid certifications, making them trusted doctors in India." },
                { question: "What types of specialists can I find on Apna OPD?", answer: "You can connect with general physicians, dermatologists, gynecologists, pediatricians, dentists, and other top doctors in India." },
                { question: "Is my medical data secure on Apna OPD?", answer: "Yes. We follow strict data privacy protocols to ensure your personal and health information is fully protected." },
                { question: "How do I book a doctor appointment through Apna OPD?", answer: "Search by name, specialty, or city, choose your preferred doctor and time slot, and confirm your appointment online. It's quick and hassle-free." },
            ],
        },
        {
            title: "Appoinment",
            list: [
                { question: "Can I book an appointment for emergency medical services?", answer: "Yes, Apna OPD offers access to emergency and urgent care doctors who are available for fast response consultations." },
                { question: "Do you offer appointments with internal medicine or critical care specialists?", answer: "Yes. You can find and consult internal medicine and critical care specialists online for in-depth assessments and treatment plans." },
                { question: "How do I reschedule or cancel an appointment?", answer: "You can easily reschedule or cancel any booked appointment through your Apna OPD account dashboard with just a few clicks." },
                { question: "Can I book appointments for pain management or chronic conditions?", answer: "Yes. We have doctors who specialize in pain medicine and chronic condition care. Book an OPD consultation online with the right expert for you." },
                { question: "Can I consult a doctor for general health or preventive checkups?", answer: "Absolutely. Apna OPD allows you to schedule preventive care, annual health checkups, and consultations for general wellness." },
            ],
        },
        {
            title: "Payment",
            list: [
                { question: "Is my payment information safe on Apna OPD?", answer: "Yes, we use encrypted and PCI-compliant payment gateways to ensure complete safety of your financial data." },
                { question: "Can I get a refund if I cancel my appointment?", answer: "Absolutely. If canceled within the eligible time frame, your payment will be refunded based on our refund policy." },
                { question: "Do I need to pay before consulting the doctor?", answer: "Yes, pre-payment is required to confirm your slot and secure your consultation with a verified doctor." },
                { question: "Are there any hidden charges in the consultation fee?", answer: "No. All charges are transparently displayed before payment. You only pay what you see." },
            ],
        },
        {
            title: "Consultation",
            list: [
                { question: "How do I consult a doctor online with Apna OPD?", answer: "Simply search for a doctor, choose your time slot, and start your consultation directly from your mobile." },
                { question: "Can I consult a specialist through the platform?", answer: "Yes, we offer access to top specialists in India across cardiology, dermatology, gynecology, pediatrics, and more." },
                { question: "Is online consultation as effective as in-person visits?", answer: "For most non-emergency issues, yes. Our doctors provide accurate diagnoses and guidance through secure video consultations." },
                { question: "Can I upload my reports or prescriptions for the doctor to review?", answer: "Yes, you can upload medical reports, lab results, or previous prescriptions before your consultation begins." },
                { question: "How long does a typical consultation last?", answer: "A standard consultation lasts around 15–20 minutes, ensuring enough time for a complete discussion of your concern." },
            ],
        },
    ];


    const toggleAnswer = (index) => {
        setActiveIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return (
        <div className="max-w-[1084px] px-[15px] sm:px-[30px] mx-auto pb-[60px] md:pb-[120px] pt-[60px] md:pt-[80px]">
            {/* <div className="mb-[60px] md:mb-[80px]">
                <Form name="searchForm" className="flex flex-col sm:flex-row gap-[17px] w-full">
                    <Form.Item name="search" className="mb-0 w-full">
                        <Input
                            placeholder="Search Doctor, Nurse, Ambulance etc."
                            className="h-[50px] text-base"
                            prefix={
                                <Image
                                    className="mr-3"
                                    src="/images/search.svg"
                                    width={24}
                                    height={24}
                                    alt="Location Icon"
                                />
                            }
                        />
                    </Form.Item>
                    <button
                        className="bg-[#3DB8F5] px-[51px] py-[10px] rounded-[8px] text-lg text-white font-bold"
                        onClick={() => console.log("Search")}
                    >
                        Search
                    </button>
                </Form>
            </div> */}
            <div className="flex flex-col gap-[60px] md:gap-[80px]">
                {data?.map((item, sectionIndex) => {
                    const midIndex = Math.ceil(item.list?.length / 2); // Calculate the midpoint for dividing
                    const leftItems = item.list?.slice(0, midIndex); // Items for the left column
                    const rightItems = item.list?.slice(midIndex); // Items for the right column

                    return (
                        <div key={sectionIndex}>
                            <h2 className="title-32 mb-[24px]">{item.title}</h2>
                            <div className="flex flex-col sm:flex-row gap-[16px]">
                                {/* Left Column */}
                                <div className="flex flex-col gap-[16px]  w-full sm:w-1/2">
                                    {leftItems?.map((faq, index) => {
                                        const isActive = activeIndexes.includes(
                                            `${sectionIndex}-left-${index}`
                                        );
                                        return (
                                            <div
                                                key={index}
                                                className="text-base font-medium bg-[#F9F9FE] p-[16px] rounded-[8px] cursor-pointer relative"
                                                onClick={() => toggleAnswer(`${sectionIndex}-left-${index}`)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="w-[calc(100%-20px)]">{faq.question}</span>
                                                    <span>{isActive ? <Image
                                                        className="rotate-180"
                                                        src="/images/down_arrow.svg"
                                                        width={17}
                                                        height={10}
                                                        alt="Down Arrow"
                                                    /> : <Image
                                                        className=""
                                                        src="/images/down_arrow.svg"
                                                        width={17}
                                                        height={10}
                                                        alt="Down Arrow"
                                                    />}</span>
                                                </div>
                                                <div
                                                    className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isActive ? "max-h-[300px]" : "max-h-0"
                                                        }`}
                                                >
                                                    <p className="mt-[8px] text-[#555] text-sm pr-[30px]">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Right Column */}
                                <div className="flex flex-col gap-[16px] w-full sm:w-1/2">
                                    {rightItems?.map((faq, index) => {
                                        const isActive = activeIndexes.includes(
                                            `${sectionIndex}-right-${index}`
                                        );
                                        return (
                                            <div
                                                key={index}
                                                className="text-base font-medium bg-[#F9F9FE] p-[16px] rounded-[8px] cursor-pointer relative"
                                                onClick={() =>
                                                    toggleAnswer(`${sectionIndex}-right-${index}`)
                                                }
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="w-[calc(100%-20px)]">{faq.question}</span>
                                                    <span>{isActive ? <Image
                                                        className="rotate-180"
                                                        src="/images/down_arrow.svg"
                                                        width={17}
                                                        height={10}
                                                        alt="Down Arrow"
                                                    /> : <Image
                                                        className=""
                                                        src="/images/down_arrow.svg"
                                                        width={17}
                                                        height={10}
                                                        alt="Down Arrow"
                                                    />}</span>
                                                </div>
                                                <div
                                                    className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isActive ? "max-h-[300px]" : "max-h-0"
                                                        }`}
                                                >
                                                    <p className="mt-[8px] text-[#555] text-sm">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default FAQ;
