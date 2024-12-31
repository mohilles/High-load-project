// Миграция базы данных
import { seeder } from '../core/umzug';

/**
 * Если модуль запущен как главный, то запускаем миграцию
 */
if (require.main === module) {
  /**
   * Запуск миграции в качестве командной строки
   */
  void seeder.runAsCLI();
}
