// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  base: '/',
  integrations: [react()],
  site: 'https://nkb.nsdos.io',
});