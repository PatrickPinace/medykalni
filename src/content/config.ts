import { defineCollection, z } from 'astro:content';

const coursesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    status: z.enum(['active', 'coming_soon', 'archived']),
    format: z.string(),
    place: z.object({
      city: z.string(),
      region: z.string(),
      country: z.string(),
    }),
    pricing: z.object({
      basic: z.number(),
      standard: z.number(),
      premium: z.number(),
      currency: z.string(),
    }),
    editions: z.array(z.object({
      id: z.string(),
      active: z.boolean(),
      signupUrl: z.string(),
      onsite: z.object({
        start: z.string(),
        end: z.string(),
      }),
      placeOverride: z.object({
        city: z.string(),
        region: z.string(),
      }).optional(),
      notes: z.object({
        basicDay: z.number(),
        standardDays: z.string(),
        onlineSummary: z.string(),
      }).optional(),
    })),
    modules: z.array(z.object({
      id: z.string(),
      title: z.string(),
      mode: z.enum(['onsite', 'online']),
    })),
  }),
});

export const collections = {
  courses: coursesCollection,
};
