/**
 * Проверка наличия переменных окружения
 */
import './core/env';

/**
 * Подключение кластера
 */
import './core/cluster';

/**
 * Функция запуска ядра
 */
import { start } from './core/kernel';

/**
 * Запуск ядра приложения
 */
void start();
