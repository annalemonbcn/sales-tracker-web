import { defineConfig } from 'orval';

export default defineConfig({
  salesTrackerApi: {
    input: {
      target: 'http://localhost:3000/openapi.json',
    },
    output: {
      target: './src/shared/api/generated/salesTrackerApi.ts',
      client: 'axios',
      mode: 'single',
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: './src/shared/api/orvalMutator.ts',
          name: 'orvalMutator',
        },
      },
    },
  },
});
