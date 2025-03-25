import ArticleCard from "../common-components/article-card";

const Article = () => {
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
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pt-[60px] md:pt-[140px]">
            <h1 className="text-center title-48 mb-[32px]">Read top articles from Health Experts</h1>
            <p className="text-base text-[#808080] max-w-[608px] mx-auto text-center mb-[56px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut et enim ad minim veniam.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                {
                    data.map((item, index) => (
                        <ArticleCard key={index} date={item.date} mins={item.mins} title={item.title} description={item.description} drName={item.drName}/>
                    ))
                }
            </div>
        </div>
    );
}

export default Article;