// Встроенные зависимости
import { Server } from 'node:http';

// Логгер
import { logger } from '../core/logger';

/**
 * Закрытие сервера при выходе из приложения
 */
const exitHandler = (server?: Server) => {
  /**
   * существует ли активный сервер?
   */
  if (server) {
    /**
     * Закрытие активного сервера
     */
    server.close(() => {
      logger.info({}, 'Server closed');
      process.exit(1);
    });
  } else {
    /**
     * Иначе
     * Завершение процесса
     * с кодом 1
     */
    process.exit(1);
  }
};

/**
 * Обработка неожиданных ошибок
 */
export const unexpectedErrorHandler = (server: Server, error?: unknown) => {
  logger.fatal(
    {
      err: error,
    },
    'Unexpected Error',
  );
  exitHandler(server);
};
