import Image from "next/image";

const WhyChooseUs = () => {
    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto py-[60px] md:py-[140px]">
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5">

                <div className="flex flex-col justify-center">
                    <h1 className="title-48 mb-[24px]">Why Choose Us</h1>
                    <p className="text-[#808080] text-base mb-[20px] sm:mb-[40px]">
                        At Apna OPD, we make healthcare easy, reliable, and accessible for everyone in India. Whether you're looking to consult a doctor online, book an OPD appointment, or get expert advice from top doctors in India, our platform delivers trusted care right from your mobile. Our growing community and high ratings reflect the quality we stand by.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                        <div className="flex flex-col gap-[10px] py-[20px] xl:py-[30px]">
                            <div className="flex items-center gap-[17px]">
                                <span className="title-64 !text-[#5151E1]">10+</span>
                                <div className="title-24 text-[#2E2E2E] font-medium">
                                    Years of <br /> Experience
                                </div>
                            </div>
                            <p className="text-[#808080] text-base max-w-[260px]">
                                A decade of delivering seamless online doctor consultations across India.
                            </p>
                        </div>

                        <div className="flex flex-col gap-[10px] py-[20px] xl:py-[30px]">
                            <div className="flex items-center gap-[17px]">
                                <span className="title-64 !text-[#5151E1]">20K+</span>
                                <div className="title-24 text-[#2E2E2E] font-medium">
                                    Happy <br /> Customers
                                </div>
                            </div>
                            <p className="text-[#808080] text-base">
                                Thousands trust us to connect them with verified doctors online for all health needs.
                            </p>
                        </div>

                        <div className="flex flex-col gap-[10px] py-[20px] xl:py-[30px]">
                            <div className="flex items-center gap-[17px]">
                                <span className="title-64 !text-[#5151E1]">4.8</span>
                                <div className="title-24 text-[#2E2E2E] font-medium">
                                    Playstore <br /> Rating
                                </div>
                            </div>
                            <p className="text-[#808080] text-base max-w-[260px]">
                                Highly rated by users who love our fast, simple OPD booking experience.
                            </p>
                        </div>

                        <div className="flex flex-col gap-[10px] py-[20px] xl:py-[30px]">
                            <div className="flex items-center gap-[17px]">
                                <span className="title-64 !text-[#5151E1]">100+</span>
                                <div className="title-24 text-[#2E2E2E] font-medium">
                                    Experts <br /> Dermatology
                                </div>
                            </div>
                            <p className="text-[#808080] text-base">
                                Access specialist care online with India’s best medical professionals at your fingertips.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end md:sticky md:top-[90px]">
                    <Image
                        src="/images/happy_young_indian.svg"
                        width={504}
                        height={666}
                        alt="Doctor Image"
                        className="w-full xl:max-w-[504px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;