import { config } from 'dotenv';
config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  ACCESS_SECRET_KEY,
  ACCESS_SECRET_TIME,
  REFRESH_SECRET_KEY,
  REFRESH_SECRET_TIME,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
} = process.env;
