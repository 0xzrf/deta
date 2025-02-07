import { QAClassificationStorage } from "../r2";
import { QAClassifier, RewardCalculator } from "../filter";
import { QAPairSchema, QAPair } from "@/server/schemas/qa";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { env } from "@/env";
import { z } from "zod";

const storage = new QAClassificationStorage();
const classifier = new QAClassifier();

export const qaRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        walletAddress: QAPairSchema.shape.walletAddress,
        pairs: z.array(QAPairSchema.pick({ question: true, answer: true })),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const baseKey = `qa/${Date.now()}_${input.walletAddress.slice(2, 8)}`;
        const keys = [];

        for (let i = 0; i < input.pairs.length; i++) {
          const pair = input.pairs[i];
          const key = `${baseKey}_${i}.json`;
          await storage.saveJSON(key, {
            ...pair,
            walletAddress: input.walletAddress,
            processed: false,
            createdAt: new Date(),
          });
          keys.push(key);
        }

        return { success: true, keys };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Submission failed",
        });
      }
    }),

  process: publicProcedure
    .input(z.object({ batchSize: z.number().min(1).max(100).default(10) }))
    .mutation(async ({ input }) => {
      try {
        let processed = 0;
        let continuationToken: string | undefined;
        const currentStage = env.CURRENT_STAGE;

        while (processed < input.batchSize) {
          const { objects, nextToken } = await storage.listObjects(
            "qa/",
            continuationToken
          );

          for (const obj of objects) {
            if (!obj.Key || processed >= input.batchSize) break;

            const pair = await storage.getJSON<QAPair>(obj.Key);
            if (pair.processed) continue;

            const classificationResult = await classifier.classify(pair);
            let tokens = 0;

            if (classificationResult.finalDecision === "approved") {
              const approvingRatings = classificationResult.modelResponses
                .filter((r) => r.decision === "approved" && r.qualityRating)
                .map((r) => r.qualityRating!);

              const qualityRating =
                approvingRatings.length > 0
                  ? approvingRatings.reduce((a, b) => a + b, 0) /
                    approvingRatings.length
                  : 5;
              const userPairs = await storage.listUserPairs(pair.walletAddress);
              const processedPairs = userPairs.filter((p) => p.processed);
              const approvedCount = processedPairs.filter(
                (p) => p.classification === "approved"
              ).length;
              const approvalRate =
                processedPairs.length > 0
                  ? (approvedCount / processedPairs.length) * 100
                  : 50;
              const baseReward = RewardCalculator.getBaseReward(currentStage);
              const qualityMultiplier =
                RewardCalculator.calculateQualityMultiplier(qualityRating);
              const approvalMultiplier =
                RewardCalculator.calculateApprovalMultiplier(approvalRate);
              const web3Multiplier = 2.5;

              const categoryMultiplier = RewardCalculator.calculateCategoryMultiplier(
                classificationResult.finalCategory
              );


              tokens = Math.floor(
                baseReward *
                  qualityMultiplier *
                  approvalMultiplier *
                  categoryMultiplier
              );
            }

            await storage.saveJSON(obj.Key, {
              ...pair,
              classification: classificationResult.finalDecision,
              category: classificationResult.finalCategory,
              modelResponses: classificationResult.modelResponses,
              tokens,
              processed: true,
              updatedAt: new Date(),
            });

            processed++;
          }

          if (!nextToken) break;
          continuationToken = nextToken;
        }

        return { processed };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Processing failed",
        });
      }
    }),

  list: publicProcedure
    .input(
      z.object({
        walletAddress: z.string().optional(),
        classification: z.enum(["approved", "rejected"]).optional(),
        processed: z.boolean().optional(),
        limit: z.number().min(1).max(200).default(100),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { objects, nextToken } = await storage.listObjects(
          "qa/",
          input.cursor
        );

        const validPairs = (
          await Promise.all(
            objects.map(async (obj) => {
              if (!obj.Key) return null;
              try {
                const pair = await storage.getJSON<QAPair>(obj.Key);
                return QAPairSchema.parse(pair);
              } catch {
                return null;
              }
            })
          )
        ).filter((p): p is QAPair => p !== null);

        const filteredPairs = validPairs
          .filter((p) => {
            const walletMatch = input.walletAddress
              ? p.walletAddress.toLowerCase() ===
                input.walletAddress.toLowerCase()
              : true;
            const classificationMatch = input.classification
              ? p.classification === input.classification
              : true;
            const processedMatch =
              typeof input.processed !== "undefined"
                ? p.processed === input.processed
                : true;
            return walletMatch && classificationMatch && processedMatch;
          })
          .slice(0, input.limit);

        return {
          pairs: filteredPairs.map((pair) => ({
            walletAddress: pair.walletAddress,
            question: pair.question,
            answer: pair.answer,
            classification: pair.classification,
            category: pair.category,
            tokens: pair.tokens,
            createdAt: pair.createdAt,
          })),
          nextCursor: nextToken,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Fetch failed",
        });
      }
    }),
});
