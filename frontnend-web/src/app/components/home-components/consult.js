import Image from "next/image";

const Consult = () => {
    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto py-[60px] md:py-[140px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1 className="title-48 mb-[20px] md:mb-[32px]">Consult top doctors on your mobile</h1>
                    <p className="text-[#808080] text-base mb-[20px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut et enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-[#808080] text-base mb-[20px] md:mb-[60px]">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est tu.
                    </p>
                    <button className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold">Learn More</button>
                </div>
                <div className="flex justify-end">
                    <Image src="/images/happy_young_indian.svg" width={504} height={666} alt="Doctor Image" className="w-full md:max-w-[504px]" />
                </div>
            </div>
        </div>
    );
}

export default Consult;