// Зависимости
import { Sequelize } from 'sequelize';

// Модель
// import { MyModel as Model } from "../models";

// Add types for migration functions
type MigrationFn = (args: { context: Sequelize }) => Promise<void>;

/**
 * Функция выполнения миграции
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const up: MigrationFn = async ({ context }) => {
  //
};

/**
 * Функция отката миграции
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const down: MigrationFn = async ({ context }) => {
  //
};
