import { defineConfig } from 'orval';
import { config } from 'dotenv';

config({ path: '.env.test' });

const apiUrl = process.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('VITE_API_URL is not defined');
}

export default defineConfig({
  salesTrackerApi: {
    input: {
      target: `${apiUrl}/openapi.json`,
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
