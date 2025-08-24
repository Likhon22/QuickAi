import z from 'zod';

const articleValidationSchema = z.object({
  body: z.object({
    prompt: z.string().min(1, 'Prompt is required'),
    length: z.number().int().min(1, 'Length must be a positive integer'),
  }),
});
const blogValidationSchema = z.object({
  body: z.object({
    prompt: z.string().min(1, 'Prompt is required'),
  }),
});
const textToImageValidationSchema = z.object({
  body: z.object({
    prompt: z.string().min(1, 'Prompt is required'),
  }),
});

const aiValidations = {
  articleValidationSchema,
  blogValidationSchema,
  textToImageValidationSchema,
};

export default aiValidations;
