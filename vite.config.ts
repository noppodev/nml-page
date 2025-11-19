import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: './', // Essential for GitHub Pages subdirectory deployment
    build: {
      outDir: 'dist',
    },
    define: {
      // Only define the API key. Do not overwrite the entire process.env object
      // as it breaks React's internal NODE_ENV checks.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
  };
});