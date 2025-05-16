import Image from "next/image";

const OtherSpecialist = () => {
    const data = [
        {
            title: "Maria Antonie, MD",
        },
        {
            title: "Angela Nielson, MD",
        }
    ]
    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pb-[50px]">
             <h1 className="title-48 mb-[42px]">Other Pedriatics Specialist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                {
                    data?.map((item, index) => (
                        <div key={index} className="flex justify-between">
                            <div className="flex flex-col lg:flex-row w-full">
                                <div className="lg:mr-[10px] xl:mr-[32px]">
                                    <Image src="/images/image_placeholder.svg" width={200} height={200} alt="Working Men" className="rounded-[8px] w-full object-cover lg:max-w-[200px] max-h-[200px]" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="pt-[16px] pb-[16px] lg:pt-0">
                                        <h3 className="title-32 mb-[8px]">{item.title}</h3>
                                        <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">10 Years of Experience</p>
                                        <h4 className="title-24 text-[#808080] !font-medium">California Medical Center</h4>
                                    </div>
                                    <div className="flex justify-between lg:flex-col xl:flex-row">
                                        <h2 className="title-32 !text-[#5151E1] ">$25</h2>
                                        <button className="bg-[#3DB8F5] px-[35px] py-[10px] rounded-[8px] text-lg text-white font-bold">Detail Doctor</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default OtherSpecialist;