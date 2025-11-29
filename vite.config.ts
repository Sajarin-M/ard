import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      devtools({ enhancedLogs: { enabled: false } }),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react({ babel: { plugins: ['babel-plugin-react-compiler'] } }),
      tsConfigPaths(),
      tailwindcss(),
    ],
    server: {
      port: Number(env.PORT),
    },
  };
});
