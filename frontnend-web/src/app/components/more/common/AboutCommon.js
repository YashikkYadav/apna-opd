import Image from "next/image";

const AboutCommon = ({ profileData, serviceType }) => {

  return (
    <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pt-[60px] md:pt-[120px] pb-[43px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
        <div className="flex flex-col justify-center">
          <h1 className="title-48 mb-[24px]">About {profileData?.name}</h1>
          <p className="text-[#808080] text-base mb-[40px]">
            {profileData?.about || 
              `This is a premium ${serviceType} service provider offering high-quality services to meet your needs. With a focus on customer satisfaction and professional excellence, we strive to deliver the best experience possible.`}
          </p>
          <div className="flex flex-col gap-[32px]">
            {profileData?.certifications && (
              <div>
                <h5 className="title-24 text-[#2E2E2E]">Certifications</h5>
                <p className="text-base text-[#808080]">
                  {profileData?.certifications}
                </p>
              </div>
            )}
            
            {profileData?.establishment && (
              <div>
                <h5 className="title-24 text-[#2E2E2E]">
                  Established Since
                </h5>
                <p className="text-base text-[#808080]">
                  {profileData?.establishment}
                </p>
              </div>
            )}
            
            {profileData?.facilities && (
              <div>
                <h5 className="title-24 text-[#2E2E2E]">Facilities</h5>
                <ul className="list-disc pl-5 mt-2">
                  {Array.isArray(profileData?.facilities) ? 
                    profileData?.facilities?.map((facility, index) => (
                      <li key={index} className="text-base text-[#808080]">{facility}</li>
                    )) : 
                    <li className="text-base text-[#808080]">{profileData?.facilities}</li>
                  }
                </ul>
              </div>
            )}
            
          </div>
        </div>
        <div className="flex lg:justify-end lg:ml-[20px]">
          {/* <Image
            src={serviceData.images?.[1] || serviceData.images?.[0] || "/images/image_placeholder.svg"}
            width={504}
            height={584}
            alt={serviceData.title}
            className="w-full max-w-[504px] object-cover rounded-lg"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default AboutCommon;
