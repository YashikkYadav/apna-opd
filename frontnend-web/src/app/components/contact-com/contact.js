"use client";
import { Form, Input, message } from "antd";
import axiosInstance from "@/app/config/axios";
const { TextArea } = Input;

const Contact = ({ isCareer }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      let res;
      if (!isCareer) {
        res = await axiosInstance.post("/contact-lead", values);
      } else {
        res = await axiosInstance.post("/career-lead", values);
      }

      if ((!isCareer && res?.contactLead) || res?.careerLead) {
        alert("Your data is saved, we will get back to you shortly");
        form.resetFields();
      } else {
        message.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.log("Submit error:", error);
      // message.error("Failed to send your message.");
    }
  };

  return (
    <div className="max-w-[1084px] px-[15px] sm:px-[30px] mx-auto pb-[60px] md:pb-[120px] pt-[60px] md:pt-[80px]">
      <div className="mb-[60px] md:mb-[80px]">
        <Form
          name="contactForm"
          form={form}
          onFinish={handleSubmit}
          className="flex flex-col gap-[17px] w-full"
        >
          <div className="flex flex-col gap-[5px]">
            <label className="text-base text-[#2E2E2E]">Name</label>
            <Form.Item
              name="name"
              rules={[{ required: true }]}
              className="mb-0 w-full"
            >
              <Input
                placeholder="Enter your name"
                className="h-[50px] text-base"
              />
            </Form.Item>
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className="text-base text-[#2E2E2E]">Email</label>
            <Form.Item
              name="email"
              rules={[{ required: true, type: "email" }]}
              className="mb-0 w-full"
            >
              <Input
                placeholder="Enter your email"
                className="h-[50px] text-base"
              />
            </Form.Item>
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className="text-base text-[#2E2E2E]">Phone No</label>
            <Form.Item
              name="phone"
              rules={[{ required: true }]}
              className="mb-0 w-full"
            >
              <Input
                placeholder="Enter your phone no"
                className="h-[50px] text-base"
              />
            </Form.Item>
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className="text-base text-[#2E2E2E]">Description</label>
            <Form.Item
              name="description"
              rules={[{ required: true }]}
              className="mb-0 w-full"
            >
              <TextArea
                placeholder="Enter your description"
                className="text-base"
                rows={5}
              />
            </Form.Item>
          </div>

          <button
            type="submit"
            className="bg-[#3DB8F5] px-[51px] py-[10px] rounded-[8px] text-lg text-white font-bold"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
