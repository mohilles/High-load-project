// Миграция базы данных
import { migrator } from '../core/umzug';

/**
 * Если модуль запущен как главный, то запускаем миграцию
 */
if (require.main === module) {
  /**
   * Запуск миграции в качестве командной строки
   */
  void migrator.runAsCLI();
}
