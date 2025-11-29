import z from 'zod';

export const errorMessages = {
  required: 'Required',
  minValue: (value: number) => `Minimum value is ${value}`,
  maxValue: (value: number) => `Maximum value is ${value}`,
  minLength: (length: number) => `Minimum ${length} characters`,
  maxLength: (length: number) => `Maximum ${length} characters`,
  mustBeNumber: 'Must be a number',
  invalidEmail: 'Invalid email',
  invalidPhoneNumber: 'Invalid phone number',
};

export const passwordSchema = z
  .string()
  .min(1, errorMessages.required)
  .min(6, errorMessages.minLength(6))
  .max(100, errorMessages.maxLength(100));

export const optionalPasswordSchema = z.string().superRefine((value, ctx) => {
  if (value === '') {
    return;
  }
  const result = passwordSchema.safeParse(value);
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path,
      });
    });
  }
});

export const generateStringNumberSchema = ({
  minValue,
  maxValue,
  required,
}: { minValue?: number; maxValue?: number; required?: boolean } = {}) => {
  let baseSchema = z.string().regex(/^\d*$/, errorMessages.mustBeNumber);
  if (required) {
    baseSchema = baseSchema.min(1, errorMessages.required).max(100, errorMessages.maxLength(100));
  }
  if (minValue) {
    baseSchema.refine((value) => {
      const num = Number(value);
      return num >= minValue;
    }, errorMessages.minValue(minValue));
  }
  if (maxValue) {
    baseSchema.refine((value) => {
      const num = Number(value);
      return num <= maxValue;
    }, errorMessages.maxValue(maxValue));
  }
  return baseSchema;
};
