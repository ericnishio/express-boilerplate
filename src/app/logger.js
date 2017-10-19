// @flow

import winston from 'winston'

import type {$Request, $Response, NextFunction} from 'express'

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console(),
  ],
})

export const httpErrorMiddleware = (req: $Request, res: $Response, next: NextFunction) => {
  res.on('finish', () => {
    if (res.statusCode >= 400) {
      const message = [
        res.statusCode,
        req.method,
        req.url,
        JSON.stringify(req.body),
        JSON.stringify(req.rawHeaders),
        req.ip,
      ].join(' ')

      logger.error(`HTTP ERROR ${message}`)
    }
  })

  next()
}

export default logger
