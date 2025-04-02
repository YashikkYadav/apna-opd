import Image from "next/image";

const BannerWithImage = ({ image }) => {
    return (
        <div className="bg-[#0D7EB7] banner-with-search">
            <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right ">
                <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto sm:h-[700px] flex items-center py-[60px] sm:py-0">
                   <Image src={image} width={1232} height={545} alt="banner image" className="w-full max-h-[545px] object-cover rounded-[8px]" />
                </div>
            </div>
        </div>
    );
}

export default BannerWithImage;