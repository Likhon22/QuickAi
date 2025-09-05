import z from 'zod';

const updateCreationLikesValidationSchema = z.object({
  body: z.object({
    creationId: z
      .number()
      .int()
      .min(1, 'Creation ID must be a positive integer'),
  }),
});

const aiValidations = {
  updateCreationLikesValidationSchema,
};

export default aiValidations;
