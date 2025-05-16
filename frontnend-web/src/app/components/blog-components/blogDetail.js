"use client"
import Link from "next/link";
import ArticleCard from "../common-components/article-card";
import Image from "next/image";
import { Form, Input } from "antd";
const { TextArea } = Input;
const BlogDetail = () => {
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
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto py-[60px] md:py-[120px]">
            <div className="max-w-[1024px] mx-auto pb-[60px] md:pb-[120px]">
                <h1 className="title-48 mb-[44px]">What Eating Only Raw Diet For A Week Can Do To Your Body</h1>
                <div className="flex items-center mb-[52px]">
                    <Image src="/images/image_placeholder.svg" width={40} height={40} alt="Doctor Image" className="bg-white rounded-full h-[40px] w-[40px] mr-[16px]" />
                    <div className="text-base font-bold mr-[22px]">By Dr. Roesvelt  </div>
                    <div className="text-[#808080] text-base gap-[8px] flex items-center font-bold">
                        <span>14 Feb</span><span className="h-[4px] w-[4px] bg-[#808080] rounded-full"></span><span>3 minutes</span>
                    </div>
                </div>
                <div className="mb-[40px]">
                    <p className="mb-[20px]">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>
                </div>
                <div className="">
                    <Image src="/images/image_placeholder.svg" width={1232} height={545} alt="banner image" className="w-full max-h-[545px] object-cover rounded-[8px]" />
                </div>
                <div className="mt-[40px] mb-[64px]">
                    <p className="mb-[20px]">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>
                </div>
                <div className="flex flex-col lg:flex-row justify-between mb-[40px] sm:mb-[80px] gap-[40px] lg:gap-0">
                    <div className="flex flex-col sm:flex-row gap-[20px] sm:gap-0">
                        <h5 className="title-24 mr-[23px]">Tags</h5>
                        <ul className="flex flex-wrap gap-[8px]">
                            <li className="text-base text-[#1F1FAD] bg-[#D4D4F7] px-[29px] py-[8px] rounded-[4px]">Food</li>
                            <li className="text-base text-[#1F1FAD] bg-[#D4D4F7] px-[29px] py-[8px] rounded-[4px]">Diet</li>
                            <li className="text-base text-[#1F1FAD] bg-[#D4D4F7] px-[29px] py-[8px] rounded-[4px]">Calories</li>
                            <li className="text-base text-[#1F1FAD] bg-[#D4D4F7] px-[29px] py-[8px] rounded-[4px]">Healthy</li>
                        </ul>
                    </div>
                    <div className="flex">
                        <h5 className="title-24 mr-[23px]">Share</h5>
                        <ul className="flex gap-[8px]">
                            <li className="text-base text-[#1F1FAD] h-[40px] w-[40px] rounded-full border border-[#5151E1] flex justify-center items-center font-bold">wa</li>
                            <li className="text-base text-[#1F1FAD] h-[40px] w-[40px] rounded-full border border-[#5151E1] flex justify-center items-center font-bold">fb</li>
                            <li className="text-base text-[#1F1FAD] h-[40px] w-[40px] rounded-full border border-[#5151E1] flex justify-center items-center font-bold">tw</li>
                            <li className="text-base text-[#1F1FAD] h-[40px] w-[40px] rounded-full border border-[#5151E1] flex justify-center items-center font-bold">ig</li>
                        </ul>
                    </div>
                </div>
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
                    <div className="flex">
                        <div className="mr-[24px]">
                            <Image src="/images/image_placeholder.svg" width={1232} height={545} alt="banner image" className="w-[64px] h-[64px] object-cover rounded-full" />
                        </div>
                        <div className="w-[calc(100%-80px)]">
                            <h5 className="title-24 mb-[8px]">Anthony Siblier</h5>
                            <div className="text-[#808080] text-base gap-[8px] flex items-center mb-[16px]">
                                <span>14 Feb</span><span className="h-[4px] w-[4px] bg-[#808080] rounded-full"></span><span>06.45 PM</span>
                            </div>
                            <p className="text-base text-[#808080] max-w-[700px]">Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mr-[24px]">
                            <Image src="/images/image_placeholder.svg" width={1232} height={545} alt="banner image" className="w-[64px] h-[64px] object-cover rounded-full" />
                        </div>
                        <div className="w-[calc(100%-80px)]">
                            <h5 className="title-24 mb-[8px]">Jessica Wonkah</h5>
                            <div className="text-[#808080] text-base gap-[8px] flex items-center mb-[16px]">
                                <span>14 Feb</span><span className="h-[4px] w-[4px] bg-[#808080] rounded-full"></span><span>06.45 PM</span>
                            </div>
                            <p className="text-base text-[#808080] max-w-[700px]">Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="mb-[56px] flex justify-between items-center">
                    <h1 className="title-48">Latest Articles</h1>
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

export default BlogDetail;