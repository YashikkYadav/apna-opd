import Image from "next/image";

const WhatOurUsers = () => {
    return (
        <div className="flex flex-col md:flex-row w-full">
            <div className="md:w-[40%] bg-[#EBEBEB]">
            <Image src="/images/image_placeholder.svg" width={400} height={400} alt="Doctor Image" className="w-full max-h-[500px]" />
            </div>
            <div className="md:w-[60%] bg-[#094B89] py-[64px] px-[15px] lg:px-[30px] xl:px-[40px]">
                <div className="flex mb-[48px] gap-[10px]">
                    <h2 className="title-48 !text-white max-w-[400px] xl:mr-[230px]">What Our Users Have to Say</h2>
                    <Image src="/images/comma.svg" width={85} height={53} alt="Comma Image" />
                </div>
                <h4 className="title-32 text-white !font-medium mb-[16px]">Perfect Works and Very Recommended!</h4>
                <p className="text-white mb-[32px] max-w-[580px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div>
                    <Image src="/images/image_placeholder.svg" width={40} height={40} alt="Doctor Image" className="bg-white rounded-full h-[40px] w-[40px] mb-[8px]" />
                    <h6 className="text-base font-bold mb-[8px] text-white">Rudolf Basna</h6>
                    <p className="text-sm text-white">Founder ABZ Studio House</p>
                </div>
            </div>
        </div>
    );
}

export default WhatOurUsers;