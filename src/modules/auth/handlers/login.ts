import {Request, Response} from 'express'

import {findUserByUsername} from '../../../db/repositories/userRepository'
import {Credentials} from '../../auth/types'
import {validatePassword, generateAccessToken} from '../helpers'

export default async (req: Request, res: Response) => {
  const {username, password}: Credentials = req.body

  try {
    const user = await findUserByUsername(username)

    await validatePassword(password, user.password)

    const json = {
      jwt: await generateAccessToken(user),
    }

    res.status(200).json(json)
  } catch (e) {
    res.sendStatus(401)
  }
}
