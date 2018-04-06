import jwt from 'jsonwebtoken'

import {findUserById} from '../../../db/repositories/userRepository'
import {generateAccessToken, extractAccessToken} from '../helpers'

import {Request, Response} from 'express'

export default async (req: Request, res: Response) => {
  try {
    const accessToken = await jwt.decode(extractAccessToken(req))
    const user = await findUserById(accessToken.user._id)

    if (accessToken.refresh !== user.password) {
      res.sendStatus(401)
      return
    }

    const json = {
      jwt: await generateAccessToken(user),
    }

    res.status(201).json(json)
  } catch (e) {
    res.sendStatus(401)
  }
}
