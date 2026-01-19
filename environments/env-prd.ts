import * as dotenv from 'dotenv';

// Determine which environment to use (default to 'staging' if none is set)
const ENV = process.env.TEST_ENV || 'staging';

// Load the corresponding `.env` file
dotenv.config({ path: `config/.env.${ENV}` });

// Export environment-specific settings
export const APPCONFIG = {
  Prd: {
    Demoqa: {
      App: {
        URL: 'https://demo.spreecommerce.org/'
      }
    }
  }
};
