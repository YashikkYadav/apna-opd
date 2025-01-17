const zod = require('zod');

const sopSchema = zod.string().min(1, "SOP is required.");
const formatSchema = zod.string().min(1, "Format is required.");
const concisenessSchema = zod.string().min(1, "Conciseness is required.");
const firstNameSchema = zod.string().min(1, "First name is required.");
const lastNameSchema = zod.string().optional();
const emailSchema = zod.string().email("Email must be a valid email address.");
const passwordSchema = zod.string().min(8, "Password must be at least 8 characters long.");

const validateUser = (userData) => {
  const { sop, format, conciseness, firstName, lastName, email, password, confirmPassword } = userData;

  if (!sop || !format || !conciseness || !firstName || !email || !password) {
    return {
      error: "Please fill all the required fields.",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Confirm password doesn't match with the password.",
    };
  }

  const sopValidation = sopSchema.safeParse(sop);
  if (!sopValidation.success) {
    return {
      error: sopValidation.error.errors[0].message,
    };
  }

  const formatValidation = formatSchema.safeParse(format);
  if (!formatValidation.success) {
    return {
      error: formatValidation.error.errors[0].message,
    };
  }

  const concisenessValidation = concisenessSchema.safeParse(conciseness);
  if (!concisenessValidation.success) {
    return {
      error: concisenessValidation.error.errors[0].message,
    };
  }

  const firstNameValidation = firstNameSchema.safeParse(firstName);
  if (!firstNameValidation.success) {
    return {
      error: firstNameValidation.error.errors[0].message,
    };
  }

  const lastNameValidation = lastNameSchema.safeParse(lastName);
  if (!lastNameValidation.success) {
    return {
      error: lastNameValidation.error.errors[0].message,
    };
  }

  const emailValidation = emailSchema.safeParse(email);
  if (!emailValidation.success) {
    return {
      error: emailValidation.error.errors[0].message,
    };
  }

  const passwordValidation = passwordSchema.safeParse(password);
  if (!passwordValidation.success) {
    return {
      error: passwordValidation.error.errors[0].message,
    };
  }

  return {
    success: true,
    message: "Validation successful!",
  };
};

module.exports = {
  validateUser,
};
