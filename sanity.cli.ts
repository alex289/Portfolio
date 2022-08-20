import { createCliConfig } from 'sanity/cli';
import { sanityConfig } from './lib/sanity/sanity-config';

export default createCliConfig({
  api: {
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
  },
});
