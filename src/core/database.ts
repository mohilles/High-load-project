// Зависимости
import { Sequelize } from 'sequelize';

// Конфигурация
import { APP_CONFIG, DATABASE_CONFIG } from '../configs';

/**
 * Подключение к базе данных
 */
export const database = new Sequelize(DATABASE_CONFIG.url, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: APP_CONFIG.env.isDev()
      ? false
      : {
          require: true,
          rejectUnauthorized: false,
        },
  },
});

/**
 * Инициализация базы данных
 */
export const initDatabase = async () => {
  /**
   * Подключение к базе данных
   */
  await database.authenticate();
};
