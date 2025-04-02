import Image from "next/image";

const WhyChooseUs = () => {
    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto py-[60px] md:py-[140px]">
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5">

                <div className="flex flex-col justify-center">
                    <h1 className="title-48 mb-[24px]">Why Choose Us</h1>
                    <p className="text-[#808080] text-base mb-[20px] sm:mb-[40px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                        <div className="flex items-center gap-[17px] py-[20px] xl:py-[47px]">
                            <span className="title-64 !text-[#5151E1]">10</span>
                            <div className="title-24 text-[#2E2E2E] font-medium">Years <br></br> Experience</div>
                        </div>
                        <div className="flex items-center gap-[17px] py-[20px] xl:py-[47px]">
                            <span className="title-64 !text-[#5151E1]">20K</span>
                            <div className="title-24 text-[#2E2E2E] font-medium">Happy <br></br> Customers</div>
                        </div>
                        <div className="flex items-center gap-[17px] py-[20px] xl:py-[47px]">
                            <span className="title-64 !text-[#5151E1]">4.8</span>
                            <div className="title-24 text-[#2E2E2E] font-medium">Playstore <br></br> Rating</div>
                        </div>
                        <div className="flex items-center gap-[17px] py-[20px] xl:py-[47px]">
                            <span className="title-64 !text-[#5151E1]">100</span>
                            <div className="title-24 text-[#2E2E2E] font-medium">Experts <br></br> Dermatology</div>
                        </div>
                    </div>

                </div>
                <div className="flex justify-end md:sticky md:top-[90px]">
                    <Image src="/images/happy_young_indian.svg" width={504} height={666} alt="Doctor Image" className="w-full xl:max-w-[504px]" />
                </div>
            </div>
        </div>
    );
}

export default WhyChooseUs;