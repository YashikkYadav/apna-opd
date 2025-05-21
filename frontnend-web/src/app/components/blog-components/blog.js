"use client"; // Ensure this is at the top if not already present
import Link from "next/link";
import ArticleCard from "../common-components/article-card";
import { blogData } from "../../data/blogData"; // Import the blog data
import { useState } from "react"; // Import useState

const Blog = () => {
    // const data = [ ... existing static data removed for brevity ... ]; // Remove old static data

    const [popularArticlesToShow, setPopularArticlesToShow] = useState(3);
    const [latestArticlesToShow, setLatestArticlesToShow] = useState(3);

    const handleSeeAllPopular = () => {
        setPopularArticlesToShow(blogData.length);
    };

    const handleSeeAllLatest = () => {
        setLatestArticlesToShow(blogData.length);
    };

    // Assuming blogData has at least 6 articles to split between popular and latest for initial view
    // Or adjust logic if they should pull from the same full list and just display different amounts initially
    const popularArticles = blogData.slice(0, popularArticlesToShow);
    // Example: latest articles could be a different slice or a shuffled version
    // For this example, let\'s use a different part of the blogData for "Latest News"
    // Ensure blogData is long enough or adjust slicing. For simplicity, we\'ll use some from the end.
    const latestArticles = blogData.slice(Math.max(0, blogData.length - latestArticlesToShow)).reverse();


    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pt-[60px] md:pt-[160px] pb-[60px] md:pb-[120px]">
            <div className="mb-[60px] md:mb-[120px]">
                <h1 className="title-64 !text-[#2E2E2E] max-w-[700px] mb-[32px]">Health Articles from Our Experts</h1>
                <p className="text-base text-[#2E2E2E] max-w-[620px]">Stay informed with our latest health insights and expert advice. Explore articles on wellness, disease prevention, and healthy living.</p>
            </div>
            {/* <div className="pb-[60px] md:pb-[120px]">
                // ... (Corona Virus section remains commented) ...
            </div> */}
            <div className="pb-[60px] md:pb-[120px]">
                <div className="mb-[30px] md:mb-[56px] flex justify-between items-center">
                    <h1 className="title-48">Popular Articles</h1>
                    {popularArticlesToShow < blogData.length && (
                        <button onClick={handleSeeAllPopular} className="title-24 text-[#094B89] hover:underline">See All</button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    {
                        popularArticles.map((item, index) => (
                            <ArticleCard 
                                key={item.slug || index} // Use slug for key if available
                                slug={item.slug}
                                date={item.date} 
                                mins={item.mins} 
                                title={item.title} 
                                description={item.description} 
                                drName={item.drName}
                                image={item.image} // Pass the image
                            />
                        ))
                    }
                </div>
            </div>
            <div>
                <div className="mb-[30px] md:mb-[56px] flex justify-between items-center">
                    <h1 className="title-48">Latest News</h1>
                     {latestArticlesToShow < blogData.length && ( // Assuming latest also pulls from blogData
                        <button onClick={handleSeeAllLatest} className="title-24 text-[#094B89] hover:underline">See All</button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    {/* Displaying a different set or all for "Latest News" */}
                    {/* For this example, let\'s use a potentially different slice or reverse order from blogData */}
                    {
                        latestArticles.map((item, index) => (
                            <ArticleCard 
                                key={item.slug || index} 
                                slug={item.slug}
                                date={item.date} 
                                mins={item.mins} 
                                title={item.title} 
                                description={item.description} 
                                drName={item.drName} 
                                image={item.image}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Blog;