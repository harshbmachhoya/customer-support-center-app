import { z } from 'nestjs-zod/z';

export const createAgentSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.object({ _id: z.string(), name: z.string() }),
});
