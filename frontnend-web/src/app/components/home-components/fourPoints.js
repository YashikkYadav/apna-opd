import Image from "next/image";

const FourPoints = () => {
    const data = [
        {
            title: "Find Doctor",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, the sed do eiusmod tempor elit et incididunt ut labore et dolore"
        },
        {
            title: "Book Appointment",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, the sed do eiusmod tempor elit et incididunt ut labore et dolore"
        },
        {
            title: "Consult",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, the sed do eiusmod tempor elit et incididunt ut labore et dolore"
        },
        {
            title: "Buy Medicine ",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, the sed do eiusmod tempor elit et incididunt ut labore et dolore"
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
                        data.map((item, index) => (
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