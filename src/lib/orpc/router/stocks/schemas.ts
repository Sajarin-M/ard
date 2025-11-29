import { z } from 'zod';

export const getStocksSchema = z.object({
  districtCode: z.string().min(1),
  fpsId: z.string().min(1),
  month: z.string().min(1),
  year: z.string().min(1),
  tsoCode: z.string().min(1),
});
