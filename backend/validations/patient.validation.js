const zod = require('zod');

const PatientSchema = zod.object({
  fullName: zod
    .string()
    .min(3, { message: 'Full name must contain at least 3 characters.' })
    .trim(),
  phoneNumber: zod
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be a 10-digit number.' }),
  alternatePhoneNumber: zod
    .string()
    .regex(/^\d{10}$/, { message: 'Alternate phone number must be a 10-digit number.' })
    .optional()
    .nullable(),
  // dateOfBirth: zod.coerce
  //   .date({ message: 'Date of birth is invalid. Please provide a valid date.' })
  //   .optional(),
  // age: zod
  //   .number()
  //   .min(0, { message: 'Age must be a positive number.' })
  //   .max(150, { message: 'Age must be realistic (below 150).' })
  //   .optional(),
  gender: zod
    .enum(['Male', 'Female', 'Other'], { message: 'Gender must be Male, Female, or Other.' }),
  // email: zod
  //   .string()
  //   .email({ message: 'Email address is invalid. Please provide a valid email.' })
  //   .trim()
  //   .optional(),
  // address: zod
  //   .string()
  //   .min(1, { message: 'Address cannot be empty.' })
  //   .trim()
  //   .optional(),
});

const validatePatient = (patientData) => {
  const result = PatientSchema.safeParse(patientData);

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
  validatePatient,
};
