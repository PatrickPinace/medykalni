// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: 'https://PatrickPinace.github.io',
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});
