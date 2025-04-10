import Image from "next/image";
import Link from "next/link";

const Specialist = () => {
    const data = [
        {
            title: "Anesthesiology",
            image: ""
        },
        {
            title: "Dermatology",
            image: ""
        },
        {
            title: "Radiology",
            image: ""
        },
    ]
    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pt-[60px] md:pt-[95px] pb-[60px] md:pb-[160px]">
            <div className="mb-[30px] md:mb-[56px] flex justify-between items-center">
                <h1 className="title-48">Specialist</h1>
                <Link href="/" className="title-24 text-[#094B89]">See All</Link>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                {
                    data?.map((item, index) => (
                        <div key={index} className="relative">
                            <Image src="/images/image_placeholder.svg" width={400} height={400} alt="Working Men" className="object-cover w-full max-h-[400px] rounded-[8px]" />
                            <div className="absolute bottom-[56px] title-32 w-full text-center">{item.title}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Specialist;