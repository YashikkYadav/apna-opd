import Image from "next/image";

const FourPoints = () => {
    const data = [
        {
            title: "Find Doctor in India",
            description: "Quickly find specialist doctors across India by name, location, or expertise. Apna OPD helps you connect with trusted medical professionals for in-person or online care."
        },
        {
            title: "Book OPD Appointment Online",
            description: "Skip the queue—book your OPD appointment online with top doctors near you. Apna OPD ensures a smooth and timely booking experience for all medical needs."
        },
        {
            title: "Online Doctor Consultation",
            description: "Consult experienced doctors from the comfort of your home via secure video or phone calls. Ideal for follow-ups, general advice, and non-emergency care."
        },
        {
            title: "Buy Medicine Online",
            description: "Order prescribed medicines online and get fast doorstep delivery anywhere in India. Apna OPD partners with trusted pharmacies to ensure safe and timely access."
        },
    ]
    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pt-[60px] md:pt-[140px]">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="md:sticky md:top-[140px] md:h-[calc(100vh-140px)]">
                    <Image src="/images/male_working.svg" width={482} height={664} alt="Working Men" className="w-full md:max-w-[504px]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 sm:gap-x-[30px] md:gap-[16px]">
                    {
                        data?.map((item, index) => (
                            <div key={index} className="md:px-[32px] py-[30px] md:pb-0 hover:shadow-lg rounded-[8px]">
                                <div className="h-[80px] w-[80px] bg-[#094B89] rounded-full mb-[24px]"></div>
                                <h2 className="text-2xl font-bold mb-[16px]">{item.title}</h2>
                                <p className="text-[#808080]">{item.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default FourPoints;