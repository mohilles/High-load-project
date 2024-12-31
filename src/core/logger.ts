// Зависимости
import { LoggerOptions, pino } from 'pino';

// Конфигурация
import { APP_CONFIG } from '../configs';

/**
 * Конфигурации логгера
 */
export const pinoConfigs: LoggerOptions = {
  level: 'debug',

  /**
   * Форматирование данных
   */
  formatters: {
    bindings: (bindings) => {
      return {
        ...bindings,
        env: APP_CONFIG.env.get(),
        pid: bindings.pid as number,
        host: bindings.hostname as string,
        node_version: process.version,
      };
    },
  },

  /**
   * Функция для форматирования времени
   */
  timestamp: pino.stdTimeFunctions.isoTime,

  /**
   * Настройки редактирования данных в целях безопасности
   */
  redact: {
    paths: [
      'phoneNumber',
      'fullName',
      'email',
      'password',
      'user.phoneNumber',
      'user.fullName',
      'user.email',
      'user.password',
      '*.user.phoneNumber', // * is a wildcard covering a depth of 1
      '*.user.fullName',
      '*.user.email',
      '*.user.password',
    ],
    remove: true, // Remove the redacted values
  },
};

/**
 * Инициализация Логгер
 */
export const logger = pino(pinoConfigs);
