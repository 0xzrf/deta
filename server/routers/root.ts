import { createCallerFactory, createTRPCRouter } from "@/server/trpc";
import { qaRouter } from "./qa";

export const appRouter = createTRPCRouter({
  qa: qaRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
