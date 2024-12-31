// Встроенные зависимости
import cluster from 'cluster';
import { availableParallelism } from 'os';

// Логгер
import { logger } from './logger';
// Конфигурация
import { APP_CONFIG } from '../configs';

/**
 * Количество доступных ядер для параллельной работы
 */
const numCPUs = availableParallelism();

/**
 * ِФункция инициализации класстера воркеров
 */
if (cluster.isPrimary) {
  /**
   * Количество воркеров
   */
  const numOfWorkers =
    APP_CONFIG.concurrency || (APP_CONFIG.env.isProd() ? numCPUs || 1 : 1);

  /**
   * Логирование
   */
  logger.info(
    {
      numCPUs,
      concurrency: APP_CONFIG.concurrency,
      numOfWorkers,
    },
    `Primary cluster (pid: ${process.pid.toString()}) is running`,
  );

  /**
   * Создание воркеров
   */
  for (let i = 0; i < +numOfWorkers; i++) {
    const worker = cluster.fork();

    worker.on('exit', (code, signal) => {
      if (signal) {
        logger.warn(
          {
            signal,
            workerId: worker.id,
          },
          `worker was killed by signal (${signal})`,
        );
      } else if (code !== 0) {
        logger.error(
          {
            code,
            workerId: worker.id,
          },
          `worker exited with error code (${code.toString()})`,
        );
      } else {
        logger.debug(
          {
            workerId: worker.id,
          },
          'worker exited systematically',
        );
      }
    });
  }
}
