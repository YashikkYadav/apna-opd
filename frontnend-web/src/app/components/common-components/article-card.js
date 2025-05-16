import Image from "next/image";
import Link from "next/link";

const ArticleCard = ({slug, date, mins, title, drName, description, image}) => {
    return (
        <div className="border border-[#E6E6E6] rounded-[8px] flex flex-col h-full">
            <div className="relative w-full h-[200px]">
                <Image 
                    src={image || "/images/image_placeholder.svg"}
                    alt={title || "Article image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-[8px]"
                />
            </div>
            <div className="py-[24px] px-[16px] flex flex-col flex-grow">
                <div className="text-[#808080] text-sm gap-[8px] flex items-center mb-[16px]">
                    <span>{date}</span><span className="h-[4px] w-[4px] bg-[#D4D4DD] rounded-full"></span>    <span>{mins} minutes read</span>
                </div>
                <h2 className="title-24 text-[#2E2E2E] mb-[16px] min-h-[3em]">{title}</h2>
                <p className="text-base text-[#5151E1] font-bold mb-[16px]">By {drName}</p>
                <p className="text-base text-[#808080] mb-[24px] flex-grow">{description}</p>
                <button className="bg-[#3DB8F5] px-[26px] py-[10px] rounded-[8px] text-lg text-white font-bold w-fit mt-auto">
                    <Link href={slug ? `/blog/${slug}` : "/blog/details"}>Read More</Link>
                </button>
            </div>
        </div>
    );
}

export default ArticleCard;