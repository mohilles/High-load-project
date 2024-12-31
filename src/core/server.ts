// Встроенные зависимости
import cluster from 'cluster';

// Приложение
import { app } from './app';
// Конфигурация
import { APP_CONFIG } from '../configs';
// Логгер
import { logger } from './logger';
// Утилиты
import { unexpectedErrorHandler } from '../utils/unexpected-error-handler';

/**
 * Обработка необработанных ошибок
 */
process.on('uncaughtException', (error) => {
  unexpectedErrorHandler(app.server, error);
});
process.on('unhandledRejection', (error) => {
  unexpectedErrorHandler(app.server, error);
});

/**
 * Обработка сигналы завершения работы приложения
 */
process.on('SIGTERM', () => {
  unexpectedErrorHandler(app.server);
});
process.on('SIGINT', () => {
  unexpectedErrorHandler(app.server);
});

/**
 * Запуск сервера
 */
export const startServer = async () => {
  /**
   * Если процесс воркера
   */
  if (cluster.isWorker) {
    try {
      /**
       * Запуск сервера
       */
      await app.listen({
        host: '0.0.0.0',
        port: APP_CONFIG.port,
        listenTextResolver: (address) => {
          return `Worker ${
            cluster.worker?.id.toString() ?? 'unknown'
          } is running on ${address}`;
        },
      });
    } catch (error) {
      /**
       * В случае ошибки
       */
      logger.error(
        {
          workerId: cluster.worker?.id,
          port: APP_CONFIG.port,
          error,
        },
        `Failed to start server on port ${APP_CONFIG.port.toString()}`,
      );

      process.exit(1);
    }
  }
};
