const zod = require("zod");

// Medicine schema for Medical invoices
const MedicineSchema = zod.object({
  medicineName: zod.string().min(0, { message: "Medicine name is required." }),
  amount: zod.number().min(0, { message: "Amount must be at least 0." }),
  quantity: zod.number().min(0, { message: "Quantity must be at least 0." }),
  discount: zod
    .number()
    .min(0, { message: "Discount cannot be negative." })
    .default(0),
});

// Service schema for Hospital invoices
const ServiceSchema = zod.object({
  serviceName: zod.string().min(0, { message: "Service name is required." }),
  serviceDate: zod.string().optional(),
  amount: zod.number().min(0, { message: "Amount must be at least 0." }),
  quantity: zod.number().min(0, { message: "Quantity must be at least 0." }),
});

// Base schema for common fields
const BaseInvoiceSchema = zod.object({
  patientName: zod
    .string()
    .min(1, { message: "Patient name is required." })
    .trim(),
  patientPhone: zod
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be a 10-digit number." }),
  patientAddress: zod.string().optional(),
  paymentStatus: zod
    .enum(["Billed", "Unbilled", "Partially Paid"])
    .default("Unbilled")
    .optional(),
  paymentMode: zod
    .enum(["Cash", "Credit Card", "UPI", "Online", "Insurance"])
    .default("Cash")
    .optional(),
  totalAmount: zod
    .number()
    .min(0, { message: "Total amount must be at least 0." }),
  invoiceType: zod.enum(["Medical", "Hospital"]),
});

// Medical Invoice Schema
const MedicalInvoiceSchema = BaseInvoiceSchema.extend({
  invoiceType: zod.literal("Medical"),
  medicalName: zod
    .string()
    .min(0, { message: "Medical name is required." })
    .trim(),
  medicines: zod
    .array(MedicineSchema)
    .min(1, { message: "At least one medicine is required." }),
});

// Hospital Invoice Schema
const HospitalInvoiceSchema = BaseInvoiceSchema.extend({
  invoiceType: zod.literal("Hospital"),
  patientAge: zod.number().min(0).max(150).optional(),
  patientGender: zod.enum(["Male", "Female", "Other"]).optional(),
  hospitalName: zod
    .string()
    .min(1, { message: "Hospital name is required." })
    .trim(),
  hospitalPhone: zod
    .string()
    .regex(/^\d{10}$/, { message: "Hospital phone must be a 10-digit number." })
    .optional(),
  hospitalAddress: zod.string().optional(),
  regNo: zod
    .string()
    .min(1, { message: "Registration number is required." })
    .trim(),
  billNo: zod.string().min(1, { message: "Bill number is required." }).trim(),
  doctorName: zod
    .string()
    .min(1, { message: "Doctor name is required." })
    .trim(),
  department: zod.string().optional(),
  admissionDate: zod.string().optional(),
  dischargeDate: zod.string().optional(),
  roomType: zod
    .enum(["General", "Semi-Private", "Private", "ICU", "CCU"])
    .optional(),
  roomNumber: zod.string().optional(),
  services: zod
    .array(ServiceSchema)
    .min(1, { message: "At least one service is required." }),
  overallDiscount: zod
    .number()
    .min(0, { message: "Discount cannot be negative." })
    .default(0)
    .optional(),
  grandTotal: zod
    .number()
    .min(0, { message: "Grand total must be at least 0." })
    .optional(),
});

// Combined Invoice Schema using discriminated union
const InvoiceSchema = zod.discriminatedUnion("invoiceType", [
  MedicalInvoiceSchema,
  HospitalInvoiceSchema,
]);

// Legacy schema for backward compatibility
const LegacyInvoiceSchema = zod.object({
  name: zod.string().min(1, { message: "Name is required." }).trim(),
  phone: zod
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be a 10-digit number." }),
  paymentStatus: zod.string().default("Unbilled").optional(),
  privateNote: zod.string().optional(),
  items: zod
    .array(
      zod.object({
        service: zod.string().optional(),
        amount: zod.number().min(0).default(0),
        quantity: zod.number().min(0).default(0),
        discount: zod.number().min(0).default(0),
      })
    )
    .min(1, { message: "At least one item is required." }),
  additionalDiscountAmount: zod
    .number()
    .min(0, { message: "Discount amount cannot be negative." })
    .optional(),
  totalAmount: zod
    .number()
    .min(0, { message: "Total amount must be at least 0." }),
  paymentMode: zod.string().default("Cash").optional(),
  patientNote: zod.string().optional(),
});

const validateInvoice = (invoiceData) => {
  // Check if it's a new invoice format or legacy format
  const isNewFormat =
    invoiceData.invoiceType &&
    (invoiceData.invoiceType === "Medical" ||
      invoiceData.invoiceType === "Hospital");

  let result;

  if (isNewFormat) {
    result = InvoiceSchema.safeParse(invoiceData);
  } else {
    // Use legacy schema for backward compatibility
    result = LegacyInvoiceSchema.safeParse(invoiceData);
  }

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      field: err.path.join("."),
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
  validateInvoice,
};
