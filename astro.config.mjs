// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'static',
  site: 'https://filosofisk-forum.dk',
  adapter: node({
    mode: 'standalone',
  }),
});
