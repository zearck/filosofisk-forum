import { defineCollection, z } from 'astro:content';

const foredrag = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    speaker: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { foredrag };
