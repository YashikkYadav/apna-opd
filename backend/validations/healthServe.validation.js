const zod = require('zod');

const HealthSchema = zod.object({
  type: zod
    .string()
    .min(1, { message: 'Type must contain at least 1 character.' })
    .trim(),
  name: zod
    .string()
    .min(3, { message: 'Name must contain at least 3 characters.' })
    .trim(),
  phone: zod
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be a 10-digit number.' }),
  email: zod
    .string()
    .email({ message: 'Email address is invalid. Please provide a valid email.' })
    .trim()
    .optional(),
  password: zod
    .string()
    .min(8, { message: 'Password must contain at least 8 characters.' })
    .trim(),
  location: zod
    .string()
    .min(1, { message: 'Address cannot be empty.' })
    .trim(),
});

const validateHealthServe = (data) => {
  const result = HealthSchema.safeParse(data);

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
  validateHealthServe,
};
