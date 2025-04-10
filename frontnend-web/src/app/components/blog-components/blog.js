import Link from "next/link";
import ArticleCard from "../common-components/article-card";

const Blog = () => {
    const data = [
        {
            date: "14 Feb, 2021",
            mins: 3,
            title: "What Eating Only Raw Diet For A Week Can Do To Your Body",
            description: "Lorem ipsum dolor sit amet, consectetur etsita adipiscing elit, the sed do eiusmod tempor elit.",
            drName: "Dr. Roesvelt",
            link: "/"
        },
        {
            date: "14 Feb, 2021",
            mins: 3,
            title: "What Eating Only Raw Diet For A Week Can Do To Your Body",
            description: "Lorem ipsum dolor sit amet, consectetur etsita adipiscing elit, the sed do eiusmod tempor elit.",
            drName: "Dr. Roesvelt",
            link: "/"
        },
        {
            date: "14 Feb, 2021",
            mins: 3,
            title: "What Eating Only Raw Diet For A Week Can Do To Your Body",
            description: "Lorem ipsum dolor sit amet, consectetur etsita adipiscing elit, the sed do eiusmod tempor elit.",
            drName: "Dr. Roesvelt",
            link: "/"
        }
    ]
    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pt-[60px] md:pt-[160px] pb-[60px] md:pb-[120px]">
            <div className="mb-[60px] md:mb-[120px]">
                <h1 className="title-64 !text-[#2E2E2E] max-w-[700px] mb-[32px]">Health Articles from Our Experts</h1>
                <p className="text-base text-[#2E2E2E] max-w-[620px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            </div>
            <div className="pb-[60px] md:pb-[120px]">
                <div className="mb-[30px] md:mb-[56px] flex justify-between items-center">
                    <h1 className="title-48">Corona Virus</h1>
                    <Link href="/" className="title-24 text-[#094B89]">See All</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    {
                        data?.map((item, index) => (
                            <ArticleCard key={index} date={item.date} mins={item.mins} title={item.title} description={item.description} drName={item.drName} />
                        ))
                    }
                </div>
            </div>
            <div className="pb-[60px] md:pb-[120px]">
                <div className="mb-[30px] md:mb-[56px] flex justify-between items-center">
                    <h1 className="title-48">Popular Articles</h1>
                    <Link href="/" className="title-24 text-[#094B89]">See All</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    {
                        data?.map((item, index) => (
                            <ArticleCard key={index} date={item.date} mins={item.mins} title={item.title} description={item.description} drName={item.drName} />
                        ))
                    }
                </div>
            </div>
            <div>
                <div className="mb-[30px] md:mb-[56px] flex justify-between items-center">
                    <h1 className="title-48">Latest News</h1>
                    <Link href="/" className="title-24 text-[#094B89]">See All</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    {
                        data?.map((item, index) => (
                            <ArticleCard key={index} date={item.date} mins={item.mins} title={item.title} description={item.description} drName={item.drName} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Blog;