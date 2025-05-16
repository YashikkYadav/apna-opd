import Image from "next/image";
import Link from 'next/link';

const About = () => {
    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto py-[60px] md:py-[140px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex">
                    <Image src="/images/happy_young_indian.svg" width={504} height={666} alt="Doctor Image" className="w-full md:max-w-[504px]" />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="title-48 mb-[20px] lg:mb-[32px]">About Us</h1>
                    <p className="text-[#808080] text-base mb-[20px]">Apna OPD is a leading OPD booking platform in India that helps users find doctors online and book appointments with ease. Whether you need to consult a general physician, a specialist, or seek urgent medical advice, we make online doctor consultation in India simple, secure, and accessible—right from your mobile.
                    </p>
                    <p className="text-[#808080] text-base mb-[20px]">
                        With a network of trusted doctors in India, Apna OPD ensures you receive verified care across various specialties including gynecology, dermatology, pediatrics, mental health, and more. Our goal is to provide reliable, real-time healthcare for everyone—whether you're in a metro city or a small town.
                    </p>
                    <p className="text-[#808080] text-base mb-[20px]">
                        We believe that quality healthcare should be just a click away. That's why Apna OPD offers:
                    </p>
                    <ul className="list-none text-[#808080] text-base mb-[20px]">
                        <li>✅ Seamless doctor discovery</li>
                        <li>✅ Instant online appointment booking</li>
                        <li>✅ Secure mobile doctor consultations</li>
                        <li>✅ Access to verified and experienced doctors in India</li>
                    </ul>
                    <p className="text-[#808080] text-base mb-[20px] md:mb-[60px]">
                        Join thousands of users who trust Apna OPD to book doctor appointments and manage their health online—anytime, anywhere.
                    </p>
                    <Link href="/about" passHref>
                        <button className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold w-fit">Learn More</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default About;