import z from 'zod';
import { errorMessages } from '~/lib/validation';

export const QUERIES_DEFAULT_STALE_TIME = 500;

export const DISTRICTS = [
  {
    code: '20',
    name: 'Malappuram',
  },
];

export const DEFAULT_DISTRICT_CODE = '20';

export const FPS_IDS = [
  {
    code: '2077049',
    name: 'Jumailath A K',
  },
  {
    code: '2077046',
    name: 'Rasheed M',
  },
  {
    code: '2077054',
    name: 'Ahammedkutty',
  },
];

export const TSOS = [{ code: '77', name: 'Kondotty' }];

export const DEFAULT_TSO_CODE = '77';

export const MONTHS = [
  { code: '01', name: 'January' },
  { code: '02', name: 'February' },
  { code: '03', name: 'March' },
  { code: '04', name: 'April' },
  { code: '05', name: 'May' },
  { code: '06', name: 'June' },
  { code: '07', name: 'July' },
  { code: '08', name: 'August' },
  { code: '09', name: 'September' },
  { code: '10', name: 'October' },
  { code: '11', name: 'November' },
  { code: '12', name: 'December' },
];

export const YEARS = [
  { code: '2024', name: '2024' },
  { code: '2025', name: '2025' },
  { code: '2026', name: '2026' },
];

export const LOCAL_STORAGE_KEYS = {
  LAST_USED_FPS_ID: 'last_used_fps_id',
};

export const STOCK_LOOKUP_SCHEMA = z.object({
  month: z.string().min(1, errorMessages.required),
  year: z.string().min(1, errorMessages.required),
  districtCode: z.string().min(1, errorMessages.required),
  tsoCode: z.string().min(1, errorMessages.required),
  fpsId: z.string().min(1, errorMessages.required),
});
