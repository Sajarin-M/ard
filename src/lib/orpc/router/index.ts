import { stocksRouter } from '~/lib/orpc/router/stocks/router';

export const orpcRouter = {
  stocks: stocksRouter,
};

export type ORPCRouter = typeof orpcRouter;
