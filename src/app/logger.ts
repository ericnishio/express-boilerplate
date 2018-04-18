import {Logger, transports} from 'winston'
import {Request, Response, NextFunction} from 'express'

const logger = new Logger({
  transports: [
    new transports.Console({
      silent: process.env.NODE_ENV === 'test',
    }),
  ],
})

export const httpLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    const message = [
      res.statusCode,
      req.method,
      req.url,
      JSON.stringify(req.body),
      JSON.stringify(req.rawHeaders),
      req.ip,
    ].join(' ')

    if (res.statusCode >= 400) {
      logger.error(`HTTP ERROR ${message}`)
    } else {
      logger.info(`HTTP OK ${message}`)
    }
  })

  next()
}

export default logger
