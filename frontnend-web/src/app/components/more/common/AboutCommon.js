import Image from "next/image";

const AboutDoctor = () => {
  return (
    <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pt-[60px] md:pt-[120px] pb-[43px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
        <div className="flex flex-col justify-center">
          <h1 className="title-48 mb-[24px]">About Maria Antonie, MD</h1>
          <p className="text-[#808080] text-base mb-[40px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
          <div className="flex flex-col gap-[32px]">
            <div>
              <h5 className="title-24 text-[#2E2E2E]">Board Certifications</h5>
              <p className="text-base text-[#808080]">
                American Board of Medical Pedriatics
              </p>
            </div>
            <div>
              <h5 className="title-24 text-[#2E2E2E]">
                Education and Training
              </h5>
              <p className="text-base text-[#808080]">
                Medical School - San Diego University, California
              </p>
            </div>
            <div>
              <h5 className="title-24 text-[#2E2E2E]">Years of Experiences</h5>
              <p className="text-base text-[#808080]">10 Years</p>
            </div>
          </div>
        </div>
        <div className="flex lg:justify-end lg:ml-[20px]">
          <Image
            src="/images/image_placeholder.svg"
            width={504}
            height={584}
            alt="Doctor Image"
            className="w-full max-w-[504px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutDoctor;
