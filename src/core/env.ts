// Зависимости
import { ValidationError } from 'joi';

// Валидация
import { envVarsSchema, makeError } from '../validators/env.validator';

// Проверка переменных окружения
const { value: envVars, error } = envVarsSchema
  .options({
    abortEarly: false,
  })
  .prefs({ errors: { label: 'key' } })
  .validate(process.env) as {
  value: Record<string, string>;
  error?: ValidationError;
};

// Выдать ошибку, если переменные окружения не установлены
makeError(error);

// Экспорт переменных окружения
export const env = {
  /**
   * Настройки приложения
   */
  app: {
    env: envVars.NODE_ENV,
    concurrency: envVars.CONCURRENCY,
    port: envVars.PORT,
  },

  /**
   * Настройки базы данных
   */
  database: {
    url:
      envVars.DATABASE_URL ||
      `postgres://admin:${envVars.STACKHERO_POSTGRESQL_PASSWORD}@${envVars.STACKHERO_POSTGRESQL_HOST}:${envVars.STACKHERO_POSTGRESQL_PORT}`,
  },

  /**
   * Настройки авторизации
   */
  auth: {
    jwt: {
      secret: envVars.JWT_SECRET,
    },
  },
} as const;
