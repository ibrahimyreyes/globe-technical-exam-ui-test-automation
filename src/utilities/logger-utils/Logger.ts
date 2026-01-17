import winston from 'winston';

export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info =>
          `[${info.timestamp ?? ''}] ${String(info.message)}`
        )
      ),
      transports: [new winston.transports.Console()]
    });
  }

  async info(message: string) {
    this.logger.info(message);
  }

  async warn(message: string) {
    this.logger.warn(message);
  }

  async error(message: string) {
    this.logger.error(message);
  }

  async debug(message: string) {
    this.logger.debug(message);
  }
}
