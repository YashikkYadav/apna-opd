"use client"
import Link from "next/link";
import ArticleCard from "../common-components/article-card";
import Image from "next/image";
import { Form, Input } from "antd";
import { blogData } from "../../data/blogData"; // Import blog data

const { TextArea } = Input;

const BlogDetail = ({ article }) => { // Accept article as a prop
    if (!article) {
        // This case should ideally be handled by the page component, 
        // but as a fallback:
        return <p className="text-center py-10">Article data is not available.</p>;
    }

    // Filter out the current article and get, for example, 3 other articles
    const relatedArticles = blogData.filter(a => a.slug !== article.slug).slice(0, 3);

    return (
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto py-[60px] md:py-[120px]">
            <div className="max-w-[1024px] mx-auto pb-[60px] md:pb-[120px]">
                <h1 className="title-48 mb-[44px]">{article.title}</h1>
                <div className="flex items-center mb-[52px]">
                    {/* Placeholder for author image - can be added to blogData if available */}
                    <Image 
                        src={article.authorImage || "/images/image_placeholder.svg"} 
                        width={40} 
                        height={40} 
                        alt={article.drName || "Doctor Image"} 
                        className="bg-white rounded-full h-[40px] w-[40px] mr-[16px] object-cover"
                    />
                    <div className="text-base font-bold mr-[22px]">By {article.drName}</div>
                    <div className="text-[#808080] text-base gap-[8px] flex items-center font-bold">
                        <span>{article.date}</span><span className="h-[4px] w-[4px] bg-[#808080] rounded-full"></span><span>{article.mins} minutes read</span>
                    </div>
                </div>
                
                {/* Main article image */}
                {article.image && (
                    <div className="mb-[40px]">
                        <Image 
                            src={article.image} 
                            width={1024} // Adjust width as per design preference
                            height={545} // Adjust height as per design preference
                            alt={article.title || "Article banner image"} 
                            className="w-full max-h-[545px] object-cover rounded-[8px]"
                        />
                    </div>
                )}

                {/* Article content - rendering HTML */}
                <div className="prose lg:prose-xl max-w-none mb-[64px]" dangerouslySetInnerHTML={{ __html: article.content }}></div>

                {/* Tags and Share section - can be made dynamic if tags are added to blogData */}
                <div className="flex flex-col lg:flex-row justify-between mb-[40px] sm:mb-[80px] gap-[40px] lg:gap-0">
                    <div className="flex flex-col sm:flex-row gap-[20px] sm:gap-0">
                        <h5 className="title-24 mr-[23px]">Tags</h5>
                        <ul className="flex flex-wrap gap-[8px]">
                            {/* Example static tags, make dynamic if needed */}
                            <li className="text-base text-[#1F1FAD] bg-[#D4D4F7] px-[29px] py-[8px] rounded-[4px]">Health</li>
                            <li className="text-base text-[#1F1FAD] bg-[#D4D4F7] px-[29px] py-[8px] rounded-[4px]">Wellness</li>
                        </ul>
                    </div>
                    <div className="flex">
                        <h5 className="title-24 mr-[23px]">Share</h5>
                        {/* Static share buttons */}
                        <ul className="flex gap-[8px]">
                            <li className="text-base text-[#1F1FAD] h-[40px] w-[40px] rounded-full border border-[#5151E1] flex justify-center items-center font-bold cursor-pointer">wa</li>
                            <li className="text-base text-[#1F1FAD] h-[40px] w-[40px] rounded-full border border-[#5151E1] flex justify-center items-center font-bold cursor-pointer">fb</li>
                            <li className="text-base text-[#1F1FAD] h-[40px] w-[40px] rounded-full border border-[#5151E1] flex justify-center items-center font-bold cursor-pointer">tw</li>
                            <li className="text-base text-[#1F1FAD] h-[40px] w-[40px] rounded-full border border-[#5151E1] flex justify-center items-center font-bold cursor-pointer">ig</li>
                        </ul>
                    </div>
                </div>

                {/* Comments Section - remains static for now */}
                <div className="mb-[60px] md:mb-[80px]">
                    <Form name="postForm" className="flex flex-col w-full">
                        <label className="title-24 mb-[24px]">Comments</label>
                        <Form.Item name="post" className="mb-[24px] w-full">
                            <TextArea rows={7} placeholder="Write your comment in here" className="h-[50px] border-[#CCCCCC] text-base" />
                        </Form.Item>
                        <button className="bg-[#3DB8F5] px-[38px] py-[10px] rounded-[8px] text-lg text-white font-bold w-fit">Post</button>
                    </Form>
                </div>
                <div className="flex flex-col gap-[32px]">
                    {/* Static comments - can be made dynamic later */}
                    <div className="flex">
                        <div className="mr-[24px]">
                            <Image src="/images/image_placeholder.svg" width={64} height={64} alt="User avatar" className="w-[64px] h-[64px] object-cover rounded-full" />
                        </div>
                        <div className="w-[calc(100%-80px)]">
                            <h5 className="title-24 mb-[8px]">Anthony Siblier</h5>
                            <div className="text-[#808080] text-base gap-[8px] flex items-center mb-[16px]">
                                <span>14 Feb</span><span className="h-[4px] w-[4px] bg-[#808080] rounded-full"></span><span>06.45 PM</span>
                            </div>
                            <p className="text-base text-[#808080] max-w-[700px]">Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.</p>
                        </div>
                    </div>
                    {/* Add more static comments if desired or implement dynamic comments */}
                </div>
            </div>

            {/* Latest Articles Section */}
            {relatedArticles.length > 0 && (
                <div>
                    <div className="mb-[56px] flex justify-between items-center">
                        <h1 className="title-48">Latest Articles</h1>
                        <Link href="/blog" className="title-24 text-[#094B89] hover:underline">See All</Link> {/* Link to main blog page */}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                        {
                            relatedArticles.map((item) => (
                                <ArticleCard 
                                    key={item.slug}
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
            )}
        </div>
    );
}

export default BlogDetail;