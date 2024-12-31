// Переменные окружения
import { env } from '../core/env';

/**
 * Конфигурация авторизации
 */
export const AUTH_CONFIG = {
  jwt: {
    secret: env.auth.jwt.secret,
  },
};
