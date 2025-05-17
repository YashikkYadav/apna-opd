const zod = require("zod");

const TimeSchema = zod.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, {
  message: "Time must be in the format 'HH:MM AM/PM'.",
});

const LocationSchema = zod.object({
  name: zod
    .string()
    .min(1, {
      message: "Location Name is required and must be a non-empty string.",
    })
    .trim(),
  address: zod
    .string()
    .min(1, { message: "Address is required and must be a non-empty string." })
    .trim(),
  days: zod
    .array(
      zod
        .string()
        .min(1, { message: "Each day must be a non-empty string." })
        .trim()
    )
    .min(1, { message: "Days must have at least one entry." }),
  from: TimeSchema,
  to: TimeSchema,
  timeslot: zod
    .number()
    .positive({ message: "Timeslot must be a positive number." }),
});

const DoctorProfileValidationSchema = zod.object({
  introduction: zod
    .string()
    .min(1, { message: "Introduction must have at least 1 characters." })
    .trim(),
  happyClients: zod.coerce
    .number()
    .positive({ message: "Number of customers should be a positive number." }),
  experience: zod.coerce
    .number()
    .positive({ message: "Experience should be a positive number." }),
  about: zod
    .string()
    .min(1, { message: "About must have at least 1 characters." })
    .trim(),
});

const validateDoctorProfile = (profileData) => {
  const validationResult = DoctorProfileValidationSchema.safeParse(profileData);

  if (!validationResult.success) {
    const errors = validationResult.error.errors.map((err) => ({
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
    data: validationResult.data,
  };
};

const RatingSchema = zod.object({
  rating: zod
    .number()
    .min(0, { message: "Rating must be at least 0." })
    .max(5, { message: "Rating cannot exceed 5." }),
});

const validateRating = (data) => {
  const validationResult = RatingSchema.safeParse(data);
  if (!validationResult.success) {
    const errors = validationResult.error.errors.map((err) => ({
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
    data: validationResult.data,
  };
};

module.exports = {
  validateDoctorProfile,
  validateRating,
};