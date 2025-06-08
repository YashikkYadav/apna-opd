"use client";
import { Form, Input, message, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from "@/app/config/axios";

const { TextArea } = Input;
const { Option } = Select;

const CareerForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("role", values.role);
    formData.append("description", values.description);
    formData.append("resume", values.resume[0].originFileObj);

    try {
      const res = await axiosInstance.post("/career-lead", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res?.careerLead) {
        message.success("Your application has been submitted successfully. We will get back to you shortly.");
        form.resetFields();
      } else {
        message.error(res?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      message.error("Failed to submit your application.");
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="max-w-[1084px] px-[15px] sm:px-[30px] mx-auto pb-[60px] md:pb-[120px] pt-[60px] md:pt-[80px]">
      <div className="mb-[60px] md:mb-[80px]">
        <Form
          name="careerForm"
          form={form}
          onFinish={handleSubmit}
          className="flex flex-col gap-[17px] w-full"
        >
          <div className="flex flex-col gap-[5px]">
            <label className="text-base text-[#2E2E2E]">Name</label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
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
              rules={[{ required: true, type: "email", message: 'Please input a valid email!' }]}
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
              rules={[{ required: true, message: 'Please input your phone number!' }]}
              className="mb-0 w-full"
            >
              <Input
                placeholder="Enter your phone no"
                className="h-[50px] text-base"
              />
            </Form.Item>
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className="text-base text-[#2E2E2E]">Role</label>
            <Form.Item
              name="role"
              rules={[{ required: true, message: 'Please select a role!' }]}
              className="mb-0 w-full"
            >
              <Select placeholder="Select a role" className="h-[50px]">
                <Option value="sales">Sales</Option>
                <Option value="frontend_developer">Frontend Developer</Option>
                <Option value="backend_developer">Backend Developer</Option>
                <Option value="full_stack_developer">Full Stack Developer</Option>
                <Option value="devops_engineer">DevOps Engineer</Option>
                <Option value="qa_engineer">QA Engineer</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className="text-base text-[#2E2E2E]">Resume (PDF only)</label>
            <Form.Item
              name="resume"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload your resume!' }]}
              className="mb-0 w-full"
            >
              <Upload
                name="logo"
                listType="picture"
                beforeUpload={() => false}
                accept=".pdf"
              >
                <button type="button" className="bg-gray-200 px-4 py-2 rounded-md flex items-center gap-2">
                  <UploadOutlined /> Click to upload
                </button>
              </Upload>
            </Form.Item>
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className="text-base text-[#2E2E2E]">Description</label>
            <Form.Item
              name="description"
              rules={[{ required: true, message: 'Please provide a description!' }]}
              className="mb-0 w-full"
            >
              <TextArea
                placeholder="Tell us about yourself"
                className="text-base"
                rows={5}
              />
            </Form.Item>
          </div>

          <button
            type="submit"
            className="bg-[#3DB8F5] px-[51px] py-[10px] rounded-[8px] text-lg text-white font-bold"
          >
            Submit Application
          </button>
        </Form>
      </div>
    </div>
  );
};

export default CareerForm;