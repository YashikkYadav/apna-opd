import Image from "next/image";
import Link from 'next/link';

const Consult = () => {
    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto py-[60px] md:py-[140px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1 className="title-48 mb-[20px] md:mb-[32px]">Consult Top Doctors in India Anytime, Anywhere</h1>
                    <p className="text-[#808080] text-base mb-[20px]">
                        Need trusted medical advice without leaving your home? With Apna OPD, you can consult doctor online in India right from your mobile. Whether you’re managing a routine illness or need quick guidance, our platform connects you with top doctors in India across all specializations. Book doctor appointment instantly and get medical consultation on mobile through video or voice — safe, secure, and convenient.
                    </p>
                    <p className="text-[#808080] text-base mb-[20px]">
                        Our online OPD India network offers fast access to certified healthcare professionals who understand your needs. No more long queues or travel — just expert care at your fingertips.
                    </p>
                    <ul className="list-none text-[#808080] text-base mb-[20px]">
                        <li>✅ Fast Booking</li>
                        <li>✅ Verified Doctors</li>
                        <li>✅ Mobile-Friendly Experience</li>
                    </ul>
                    <p className="text-[#808080] text-base mb-[20px] md:mb-[60px]">
                        Start your journey to better health today
                    </p>
                    <Link href="/find-doctor" passHref>
                        <button className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold">Book Now or Learn More</button>
                    </Link>
                </div>
                <div className="flex justify-end">
                    <Image src="/images/happy_young_indian.svg" width={504} height={666} alt="Doctor Image" className="w-full md:max-w-[504px]" />
                </div>
            </div>
        </div>
    );
}

export default Consult;