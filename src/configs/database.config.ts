// Переменные окружения
import { env } from '../core/env';

/**
 * Конфигурация базы данных
 */
export const DATABASE_CONFIG = {
  url: env.database.url,
};
