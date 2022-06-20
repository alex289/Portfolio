import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityConfig } from './sanity-config';

export const imageBuilder = createImageUrlBuilder(sanityConfig);

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source).auto('format').fit('max');
