const { z } = require("zod");

const userSchema = z.object({
  firstName: z.string().min(0, { message: "First name is required" }),
  lastName: z.string().min(0, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(0, { message: "Phone number is required" }),
  password: z
    .string()
    .min(7, { message: "Password must be at least 8 characters" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

module.exports = userSchema;
