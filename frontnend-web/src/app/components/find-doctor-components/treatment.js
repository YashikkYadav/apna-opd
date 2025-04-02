"use client";
import Image from "next/image";
import Link from "next/link";

const Treatment = () => {
    const data = [
        {
            title: "Anesthesiology",
            image: "",
            list: [
                { title: "Critical Care Medicine", link: "" },
                { title: "Hospice and palliative care", link: "" },
                { title: "Pain Medicine", link: "" },
                { title: "Pediatric Anesthesiology", link: "" },
                { title: "Sleep Medicine", link: "" },
            ],
        },
        {
            title: "Emergency Medicine",
            image: "",
            list: [
                { title: "Emergency medical services", link: "" },
                { title: "Internal medicine / Critical care", link: "" },
                { title: "Medicine", link: "" },
                { title: "Medical toxicology", link: "" },
                { title: "Pain medicine", link: "" },
            ],
        },
        {
            title: "Family Medicine",
            image: "",
            list: [
                { title: "Adolescent medicine", link: "" },
                { title: "Geriatric medicine", link: "" },
                { title: "Hospice and palliative medicine", link: "" },
                { title: "Pain medicine", link: "" },
                { title: "Sports medicine", link: "" },
            ],
        },
    ];

    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pb-[60px] md:pb-[120px]">
            <div className="mb-[30px] md:mb-[56px] flex justify-between items-center">
                <h1 className="title-48">Treatment</h1>
                <Link href="/" className="title-24 text-[#094B89]">
                    See All
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                {data.map((item, index) => (
                    <div key={index} className="border border-[#E6E6E6] rounded-[8px]">
                        <div className="relative">
                            <Image
                                src="/images/image_placeholder.svg"
                                width={400}
                                height={400}
                                alt="Working Men"
                                className="object-cover w-full max-h-[400px]"
                            />
                            <div className="absolute bottom-[56px] title-32 w-full text-center px-[10px]">
                                {item.title}
                            </div>
                        </div>
                        <div className="p-[32px]">
                            <ul>
                                {item.list.map((subItem, subIndex) => (
                                    <li key={subIndex} className="mb-[8px] text-[16px] text-[#2E2E2E] cursor-pointer">
                                        {subItem.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Treatment;
