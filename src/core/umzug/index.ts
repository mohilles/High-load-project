// Встроенные зависимости
import cluster from 'cluster';
import fs from 'fs';
import path from 'path';

// Зависимости
import { Umzug, SequelizeStorage } from 'umzug';

// База данных
import { database } from '../database';

/**
 * Путь к миграциям
 */
const MIGRATIONS_PATH = path.join(
  __dirname,
  '..',
  '..',
  'database',
  'migrations',
);

/**
 * Путь для создания миграций
 */
const CREATE_MIGRATIONS_PATH = path.join(
  path.resolve(),
  'src',
  'database',
  'migrations',
);

/**
 * Путь к шаблону миграции
 */
const MIGRATION_TEMPLATE_PATH = path.join(
  path.resolve(),
  'src',
  'core',
  'umzug',
  'templates',
  'migration.template.ts',
);

/**
 * Путь к сидам
 */
const SEEDERS_PATH = path.join(__dirname, '..', '..', 'database', 'seeders');

/**
 * Путь для создания сидов
 */
const CREATE_SEEDERS_PATH = path.join(
  path.resolve(),
  'src',
  'database',
  'seeders',
);

/**
 * Путь к шаблону сида
 */
const SEED_TEMPLATE_PATH = path.join(
  path.resolve(),
  'src',
  'core',
  'umzug',
  'templates',
  'seed.template.ts',
);

/**
 * Заменённый шаблон миграции
 */
const template = fs
  .readFileSync(MIGRATION_TEMPLATE_PATH, 'utf-8')
  .replace(
    /\/\/ import { MyModel as Model } from "\.\.\/models";/g,
    'import { MyModel as Model } from "../models";',
  )
  .replace(
    /\n\/\/ eslint-disable-next-line @typescript-eslint\/no-unused-vars/g,
    '',
  );

/**
 * Миграции базы данных с помощью Umzug
 */
export const migrator = new Umzug({
  migrations: {
    glob: [
      '*.js',
      {
        cwd: MIGRATIONS_PATH,
      },
    ],
  },
  context: database,
  storage: new SequelizeStorage({
    sequelize: database,
    modelName: 'migrationMeta',
  }),
  logger: console,
  create: {
    folder: CREATE_MIGRATIONS_PATH,
    template: (filepath) => [[filepath, template]],
  },
});

/**
 * Сидеры базы данных с помощью Umzug
 */
export const seeder = new Umzug({
  migrations: {
    glob: [
      '*.js',
      {
        cwd: SEEDERS_PATH,
      },
    ],
  },
  context: database,
  storage: new SequelizeStorage({
    sequelize: database,
    modelName: 'seedMeta',
  }),
  logger: console,
  create: {
    folder: CREATE_SEEDERS_PATH,
    template: (filepath) => [
      [filepath, fs.readFileSync(SEED_TEMPLATE_PATH, 'utf-8')],
    ],
  },
});

/**
 * Инициализация миграций
 */
export const initMigrations = async () => {
  /**
   * Проверка на главный процесс
   */
  if (cluster.isPrimary) {
    /**
     * Запуск миграций
     */
    await migrator.up();
    /**
     * Запуск сидов
     */
    await seeder.up();
  }
};
