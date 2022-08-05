import { createClient } from 'next-sanity';

import { sanityConfig } from './sanity-config';

export const sanityClient = createClient(sanityConfig);

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export const getClient = (preview: boolean) =>
  preview ? previewClient : sanityClient;
