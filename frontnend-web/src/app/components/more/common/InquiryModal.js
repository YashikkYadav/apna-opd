import React from "react";
import { Modal, Form, Input, Button } from "antd";

const { TextArea } = Input;

const InquiryModal = ({ isOpen, onClose, onSubmit, title }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title={`Inquiry for ${title}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your full name" size="large" />
        </Form.Item>

        <Form.Item
          name="mobile"
          label="Mobile Number"
          rules={[
            { required: true, message: "Please enter your mobile number" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit mobile number",
            },
          ]}
        >
          <Input placeholder="Enter your mobile number" size="large" />
        </Form.Item>

        <Form.Item
          name="inquiry"
          label="Inquiry Details"
          rules={[{ required: true, message: "Please describe your inquiry" }]}
        >
          <TextArea
            placeholder="Please describe your inquiry in detail"
            rows={4}
            size="large"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            onClick={handleSubmit}
            className="bg-[#3DB8F5] w-full py-[10px] rounded-[8px] text-lg text-white font-bold"
            size="large"
          >
            Submit Inquiry
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InquiryModal;
