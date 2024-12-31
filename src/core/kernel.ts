// Функция инициализации базы данных
import { initDatabase } from './database';
// Функция запуска сервера
import { startServer } from './server';
// Функция инициализации миграций
import { initMigrations } from './umzug';

/**
 * Инициализация ядра
 */
export const start = async () => {
  /**
   * 1- Подключение базы данных: PostgreSQL
   */
  await initDatabase();

  /**
   * 2- Инициализация миграций
   */
  await initMigrations();

  /**
   * [Конечная задача]- Запуск сервера
   */
  await startServer();
};
