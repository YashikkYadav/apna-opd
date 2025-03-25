"use client"
import { Form, Input, Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BannerWithSearch = ({ title, description }) => {
        const router = useRouter()
    
        const SearchResults = () => {
            router.push("/search-results")
        }
    return (
        <div className="bg-[#0D7EB7] banner-with-search">
            <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right">

                <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto relative md:h-[700px] pb-[60px]">
                    <div className="flex justify-between items-end pt-[60px] md:pt-[129px]">
                        <div className="max-w-[700px] mx-auto">
                            <h1 className="title-64 mb-[32px] text-center max-w-[530px] mx-auto">{title}</h1>
                            <p className="text-base text-white mb-[88px] text-center">{description}</p>
                        </div>
                    </div>

                    <div>
                        <Form name="searchForm" className="flex flex-col md:flex-row gap-[17px] w-full">
                            <Form.Item name="location" className="mb-0 w-full md:max-w-[317px]">
                                <Select className="!h-[50px]" placeholder="Location" size="large" prefix={<Image className="mr-3" src="/images/blue_location.svg" width={24} height={24} alt="Location Icon" />}>
                                    <Select.Option value="jaipur">Jaipur</Select.Option>
                                    <Select.Option value="ahmedabad">Ahmedabad</Select.Option>
                                    <Select.Option value="surat">Surat</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="search" className="mb-0 w-full">
                                <Input placeholder="Search Doctor, Nurse, Ambulance etc." className="h-[50px] border-transparent text-base hover:border-transparent" prefix={<Image className="mr-3" src="/images/search.svg" width={24} height={24} alt="Location Icon" />} />
                            </Form.Item>
                            <button className="bg-[#3DB8F5] px-[51px] py-[10px] rounded-[8px] text-lg text-white font-bold hover:text-white hover:border-white" onClick={()=> SearchResults()}>Search</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerWithSearch;