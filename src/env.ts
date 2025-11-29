import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {},

  clientPrefix: 'VITE_',

  client: {
    VITE_APP_BASE_URL: z.url(),
    VITE_ENABLE_REACT_SCAN: z.stringbool().default(false),
  },

  runtimeEnv: import.meta.env,

  emptyStringAsUndefined: true,
});
