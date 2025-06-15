const { z } = require("zod");

const userSchema = z.object({
  name: z.string().min(0, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(0, { message: "Phone number is required" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

module.exports = userSchema;
