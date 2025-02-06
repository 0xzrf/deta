import { z } from "zod";

export const CategorySchema = z.enum([
  "Development",
  "DeFi",
  "NFT",
  "General",
  "Security",
  "Economics",
  "Governance",
  "Scalability",
  "Interoperability",
  "Privacy",
  "Consensus",
  "Smart Contracts",
  "Wallets",
  "DAOs",
  "Layer 2",
  "Cross-Chain",
]);

export type Category = z.infer<typeof CategorySchema>;

export const QAPairSchema = z.object({
  walletAddress: z.string(),
  question: z.string().min(10).max(500),
  answer: z.string().min(10).max(5000),
  classification: z.enum(["approved", "rejected"]).optional(),
  category: CategorySchema.optional(),
  processed: z.boolean().default(false),
  tokens: z.number().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
});

export type QAPair = z.infer<typeof QAPairSchema>;
