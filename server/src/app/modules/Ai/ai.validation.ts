import z from 'zod';

const aiValidationSchema = z.object({
  body: z.object({
    prompt: z.string().min(1, 'Prompt is required'),
    length: z.number().int().min(1, 'Length must be a positive integer'),
  }),
});

const aiValidations = {
  aiValidationSchema,
};

export default aiValidations;
