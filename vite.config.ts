import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
  ],
  preview: {
    allowedHosts: ['formulario4.onrender.com'],
  },
});