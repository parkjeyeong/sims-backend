import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

const logDir = path.join(process.env.DATA_PATH!, 'logs');
const { combine, timestamp, printf } = winston.format;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive:  true });
}

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

const logFormat = printf((info: TransformableInfo) => {
  return `${info.timestamp} || [${info.level}] : ${info.message}${ info.stack ? '\n' + info.stack : '' }`;
});

/*
 * Log Level
 * 0 : error
 * 1 : warn
 * 2 : info
 * 3 : http
 * 4 : verbose
 * 5 : debug
 * 6 : silly
 */
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: false
    })
  ]
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
);

export default logger;