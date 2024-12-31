// Константы
import { ERR } from '../constants';

/**
 * Класс ошибки API
 */
export class ApiError extends Error {
  code: string; // Код ошибки
  msg: string; // Сообщение ошибки
  status: number; // Статус код
  details?: object; // Детали ошибки

  /**
   * Конструктор
   */
  constructor(codeObject: (typeof ERR)[keyof typeof ERR], details?: object) {
    /**
     * Вызов конструктора родительского класса Error
     */
    super(codeObject.message);

    /**
     * Инициализация полей
     */
    this.code = codeObject.code;
    this.msg = codeObject.message;
    this.status = 'status' in codeObject ? codeObject.status : 400;
    this.details = details && Object.keys(details).length ? details : undefined;

    if (!this.stack) Error.captureStackTrace(this, this.constructor);
  }
}
