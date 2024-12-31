// Зависимости
import { DataTypes, Sequelize } from 'sequelize';

// Модель
import { User as Model } from '../models';

// Add types for migration functions
type MigrationFn = (args: { context: Sequelize }) => Promise<void>;

/**
 * Функция выполнения миграции
 */
export const up: MigrationFn = async ({ context }) => {
  /**
   * Создание таблицы
   */
  await context.getQueryInterface().createTable<Model>(Model.tableName, {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
      comment: 'User ID',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Password',
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'First name',
    },
    last_name: {
      type: DataTypes.STRING,
      comment: 'Second name',
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: 'Birthdate',
    },
    biography: {
      type: DataTypes.TEXT,
      comment: 'Biography',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'City',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};

/**
 * Функция отката миграции
 */
export const down: MigrationFn = async ({ context }) => {
  /**
   * Удаление таблицы
   */
  await context.getQueryInterface().dropTable(Model.tableName);
};
