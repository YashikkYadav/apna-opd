"use client";
import { Form, Input } from "antd";
const { TextArea } = Input;

const Contact = () => {
    return (
        <div className="max-w-[1084px] px-[15px] sm:px-[30px] mx-auto pb-[60px] md:pb-[120px] pt-[60px] md:pt-[80px]">
            <div className="mb-[60px] md:mb-[80px]">
                <Form name="searchForm" className="flex flex-col gap-[17px] w-full">
                    <div className="flex flex-col gap-[5px]">
                        <label className="text-base text-[#2E2E2E]">Name</label>
                        <Form.Item name="name" className="mb-0 w-full">
                            <Input
                                placeholder="Enter your ame"
                                className="h-[50px] text-base"

                            />
                        </Form.Item>
                    </div>
                    <div  className="flex flex-col gap-[5px]">
                    <label className="text-base text-[#2E2E2E]">Email</label>
                        <Form.Item name="email" className="mb-0 w-full">
                            <Input
                                placeholder="Enter your email"
                                className="h-[50px] text-base"

                            />
                        </Form.Item>
                    </div>
                    <div  className="flex flex-col gap-[5px]">
                    <label className="text-base text-[#2E2E2E]">Phone No</label>
                        <Form.Item name="phone" className="mb-0 w-full">
                            <Input
                                placeholder="Enter your phone no"
                                className="h-[50px] text-base"

                            />
                        </Form.Item>
                    </div>
                    <div  className="flex flex-col gap-[5px]">
                    <label className="text-base text-[#2E2E2E]">Description</label>
                        <Form.Item name="description" className="mb-0 w-full">
                            <TextArea
                                placeholder="Enter your description"
                                className="h-[50px] text-base"
                                rows={5}
                            />
                        </Form.Item>
                    </div>
                    <button
                        className="bg-[#3DB8F5] px-[51px] py-[10px] rounded-[8px] text-lg text-white font-bold"
                        onClick={() => console.log("Search")}
                    >
                        Submit
                    </button>
                </Form>
            </div>


        </div>
    );
};

export default Contact;
