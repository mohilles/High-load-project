// Переменные окружения
import { env } from '../core/env';

/**
 * Конфигурация приложения
 */
export const APP_CONFIG = {
  port: +env.app.port,
  env: {
    get() {
      return env.app.env;
    },
    isDev() {
      return env.app.env === 'development';
    },
    isProd() {
      return env.app.env === 'production';
    },
    isTest() {
      return env.app.env === 'test';
    },
  },
  concurrency: env.app.concurrency || 1,
} as const;
