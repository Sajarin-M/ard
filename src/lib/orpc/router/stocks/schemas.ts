import { z } from 'zod';

export const getStocksSchema = z.object({
  districtCode: z.string().min(1).max(2),
  fpsId: z.string().min(1).max(7),
  month: z.string().min(1).max(2),
  year: z.string().min(1).max(4),
  tsoCode: z.string().min(1).max(2),
});
