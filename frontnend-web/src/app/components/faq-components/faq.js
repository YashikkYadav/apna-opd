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
                { question: "Does this service treat all patients?", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "What’s advantages that I will get by using this service?", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "How can I make an appointment with doctor?", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "How can I make an appointment with doctor?", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Does this service treat all patients?", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "What’s advantages that I will get by using this service?", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
            ],
        },
        {
            title: "Appoinment",
            list: [
                { question: "Emergency medical services", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Internal medicine / Critical care", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Medical toxicology", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Pain medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
            ],
        },
        {
            title: "Payment",
            list: [
                { question: "Adolescent medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Geriatric medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Hospice and palliative medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Pain medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Sports medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
            ],
        },
        {
            title: "Consultation",
            list: [
                { question: "Adolescent medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Geriatric medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Hospice and palliative medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Pain medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
                { question: "Sports medicine", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
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
            <div className="mb-[60px] md:mb-[80px]">
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
            </div>
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
