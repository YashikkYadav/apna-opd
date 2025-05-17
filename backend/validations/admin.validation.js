// validations/adminValidation.js or adminValidation.ts if you're using TypeScript
const { z } = require('zod');

const adminSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username must be at most 50 characters')
    .regex(/^[a-zA-Z0-9_.-]*$/, 'Username can only contain letters, numbers, underscores, periods, and dashes'),
    
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must be at most 100 characters'),
});

module.exports = adminSchema;