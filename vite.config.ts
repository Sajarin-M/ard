import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig, loadEnv } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      devtools({ enhancedLogs: { enabled: false } }),
      nitro({ preset: 'bun' }),
      tanstackStart(),
      react(),
      tsConfigPaths(),
      tailwindcss(),
    ],
    server: {
      port: Number(env.PORT),
    },
  };
});
