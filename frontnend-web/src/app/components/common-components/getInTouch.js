import Link from 'next/link';

const GetInTouch = () => {
    return (
        <div className="bg-[#0D7EB7]">
            <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right">
                <div className="py-[60px] md:py-[120px] text-center text-white px-[15px] sm:px-[30px]">
                    <h1 className="title-64 mb-[24px]">Get In Touch With Us</h1>
                    <p className="text-base max-w-[600px] mx-auto mb-[18px]">Need help with booking a doctor or accessing online consultations? The Apna OPD team is here for you. Whether it’s questions about your appointment, technical support, or just finding the right specialist — we’re only a message away.</p>
                    <p className="text-base max-w-[600px] mx-auto mb-[18px]">🔹 Fast response | 🔹 Friendly support | 🔹 India-wide service</p>
                    <p className="text-base max-w-[600px] mx-auto mb-[36px] md:mb-[36px]">📩 Click below to connect with our support team.</p>

                    <Link href="/contact" passHref>
                        <button className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold w-fit hover:text-white hover:border-white">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GetInTouch;