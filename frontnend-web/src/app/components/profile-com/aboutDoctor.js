import Image from "next/image";

const AboutDoctor = ({ doctorDetail }) => {
    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pt-[60px] md:pt-[120px] pb-[43px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
                <div className="flex flex-col justify-center">
                    <h1 className="title-48 mb-[24px]">About {doctorDetail?.doctor?.name}</h1>
                    <p className="text-[#808080] text-base mb-[40px]">{doctorDetail?.about}</p>
                    <div className="flex flex-col gap-[32px]">
                        {doctorDetail?.boardCertifications && <div>
                            <h5 className="title-24 text-[#2E2E2E]">Board Certifications</h5>
                            <p className="text-base text-[#808080]">{doctorDetail?.boardCertifications}</p>
                        </div>}
                        {doctorDetail?.educationAndTraining && <div>
                            <h5 className="title-24 text-[#2E2E2E]">Education and Training</h5>
                            <p className="text-base text-[#808080]">{doctorDetail?.educationAndTraining}</p>
                        </div>}
                        <div>
                            <h5 className="title-24 text-[#2E2E2E]">Years of Experiences</h5>
                            <p className="text-base text-[#808080]">{doctorDetail?.experience} Years</p>
                        </div>
                    </div>

                </div>
                <div className="flex lg:justify-end lg:ml-[20px]">
                    <Image src="/images/image_placeholder.svg" width={504} height={584} alt="Doctor Image" className="w-full max-w-[504px]" />
                </div>

            </div>
        </div>
    );
}

export default AboutDoctor;