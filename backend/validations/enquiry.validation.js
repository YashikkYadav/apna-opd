const zod = require('zod');

const EnquirySchema = zod.object({
  name: zod
    .string()
    .min(3, { message: 'Name must contain at least 3 characters.' })
    .trim(),
  phone: zod
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be a 10-digit number.' }),
  enquiry: zod
    .string()
    .min(3, { message: 'Enquiry must contain at least 3 characters.' })
    .trim(),
});

const validateEnquiry = (data) => {
  const result = EnquirySchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));

    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};

module.exports = {
  validateEnquiry,
};
