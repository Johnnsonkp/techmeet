import { defineConfig } from 'sanity';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  projectId: 'ypdup0843',
  dataset: 'production',
  schema: { types: schemaTypes },
});