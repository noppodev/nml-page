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
      // Use a safer fallback to prevent build errors or runtime crashes
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      // Polyfill process.env as an empty object for compatibility
      'process.env': JSON.stringify({}),
    },
  };
});