const { z } = require('zod');

const patientValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be a valid 10-digit number'),
  email: z.string().email('Invalid email address'),
  fatherName: z.string().min(1, 'Father name is required'),
  address: z.object({
    streetAddress1: z.string().min(1, 'Street Address 1 is required'),
    streetAddress2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
    zipCode: z
      .string()
      .regex(/^\d{5,6}$/, 'Zip Code must be 5 or 6 digits'),
  }),
  medicalProblem: z.string().min(1, 'Medical problem is required'),
});

const validatePatient = (data) => {
  return patientValidationSchema.safeParse(data);
};

module.exports = validatePatient;
