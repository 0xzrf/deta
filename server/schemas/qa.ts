import { z } from "zod";

export const QAPairSchema = z.object({
  walletAddress: z.string(),
  question: z.string().min(10).max(500),
  answer: z.string().min(10).max(5000),
  classification: z.enum(["approved", "rejected"]).optional(),
  processed: z.boolean().default(false),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
});

export type QAPair = z.infer<typeof QAPairSchema>;
