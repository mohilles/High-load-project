// Зависимости
import { Sequelize } from 'sequelize';

// Модель
// import { tableName } from "../models/some.model"; // <----- убрать комментарий
const tableName = 'some_table'; // <----- удалить

/**
 * Данные для заполнения таблицы
 */
const seedData = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

/**
 * Функция выполнения сида
 */
export const up = async ({ context }: { context: Sequelize }) => {
  /**
   * Заполнение таблицы данными
   */
  await context.getQueryInterface().bulkInsert(tableName, seedData);
};

/**
 * Функция отката сида
 * @param {{context: import('sequelize').Sequelize}} object - Параметры
 */
export const down = async ({ context }: { context: Sequelize }) => {
  /**
   * Удаление данных из таблицы
   */
  await context
    .getQueryInterface()
    .bulkDelete(tableName, { id: seedData.map((u) => u.id) });
};
