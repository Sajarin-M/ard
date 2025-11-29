import { ORPCError } from '@orpc/client';
import { publicProcedure } from '~/lib/orpc/utils';
import { getStocksSchema } from './schemas';

export const stocksRouter = {
  getStocks: publicProcedure.input(getStocksSchema).handler(async ({ input }) => {
    const response = await fetch(`https://epos.kerala.gov.in/fps_stock_register.action`, {
      method: 'POST',
      body: new URLSearchParams({
        dist_code: input.districtCode,
        fps_id: input.fpsId,
        month: input.month,
        year: input.year,
        office_code: input.tsoCode,
      }),
    });

    if (!response.ok) {
      throw new ORPCError('BAD_REQUEST', { message: 'Failed to fetch stock data' });
    }

    const data = await response.text();

    return data;
  }),
};
