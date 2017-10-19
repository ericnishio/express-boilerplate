// @flow

import winston from 'winston'

import type {$Request, $Response, NextFunction} from 'express'

type LogLevel = 'silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error'

class Logger {
  logger: winston.Logger

  constructor() {
    this.logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)(),
      ],
    })
  }

  log = (level: LogLevel, message: string) => this.logger.log(level, message)

  error = (message: string) => this.logger.error(message)

  warn = (message: string) => this.logger.warn(message)

  info = (message: string) => this.logger.info(message)

  verbose = (message: string) => this.logger.verbose(message)

  debug = (message: string) => this.logger.debug(message)

  silly = (message: string) => this.logger.silly(message)
}

const logger = new Logger()

export const middleware = (req: $Request, res: $Response, next: NextFunction) => {
  res.on('finish', () => {
    if (res.statusCode >= 400) {
      logger.error(`HTTP ERROR ${res.statusCode} ${req.method} ${req.url} ${JSON.stringify(req.body)} ${JSON.stringify(req.rawHeaders)}`)
    }
  })

  next()
}

export default logger
