import Image from "next/image";

const Banner = () => {
    return (
        <div className="bg-[#0B66A1] banner-with-search">

            <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto">
                <div className="flex flex-col pt-[60px] md:pt-[96px] pb-[60px] lg:pb-0">
                    <div className="title-24 text-white flex mb-[56px] flex-col sm:flex-row gap-[10px] sm:gap-0">
                        <span>Home </span> <Image
                            className="-rotate-90 mx-[8px]"
                            src="/images/down_arrow_white.svg"
                            width={17}
                            height={10}
                            alt="Down Arrow"
                        /><span>Pediatrics Specialist</span> <Image
                            className="-rotate-90 mx-[8px]"
                            src="/images/down_arrow_white.svg"
                            width={17}
                            height={10}
                            alt="Down Arrow"
                        /><span>Maria Antonie, MD</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
                        <div className="flex lg:mr-[20px]">
                            <Image src="/images/image_placeholder.svg" width={504} height={608} alt="Doctor Image" className="h-[400px] md:h-[604px] object-cover rounded-t-[8px] rounded-b-[8px] lg:rounded-b-none" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="mb-[32px]">
                                <h2 className="title-48 !text-white mb-[8px]">Maria Antonie, MD</h2>
                                <h5 className="title-24 text-white !font-medium">Pedriatics Specialist</h5>
                            </div>
                            <div className="mb-[32px]">
                                <h5 className="title-24 text-white mb-[8px]">California Medical Center</h5>
                                <p className="text-base text-white !font-normal">8819 Ohio St. South Gate, California 90280</p>
                            </div>
                            <div className="mb-[32px]">
                                <h5 className="title-24 text-white mb-[8px]">Make an Appoinment</h5>
                                <div className="flex flex-col md:flex-row gap-[16px] md:gap-[56px]">
                                    <div>
                                        <p className="text-base text-white !font-normal">Monday</p>
                                        <p className="text-base text-white font-bold">1 PM - 4 PM</p>
                                    </div>
                                    <div>
                                        <p className="text-base text-white !font-normal">Tuesday</p>
                                        <p className="text-base text-white font-bold">1 PM - 4 PM</p>
                                    </div>
                                    <div>
                                        <p className="text-base text-white !font-normal">Wednesday</p>
                                        <p className="text-base text-white font-bold">1 PM - 4 PM</p>
                                    </div>
                                    <div>
                                        <p className="text-base text-white !font-normal">Friday</p>
                                        <p className="text-base text-white font-bold">1 PM - 4 PM</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-[32px]">
                                <h3 className="title-32 text-white">Consultation Cost : $25</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-[15px]">
                                <button className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold hover:border-white hover:text-white">Make a Appoinment</button>
                                <button className="px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold border-white border hover:border-white hover:text-white">Consultation</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Banner;