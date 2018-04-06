import {findUserByUsername} from '../../../db/repositories/userRepository'
import {validatePassword, generateAccessToken} from '../helpers'

import {Request, Response} from 'express'
import {ICredentials} from '../../auth/types'

export default async (req: Request, res: Response) => {
  const {username, password}: ICredentials = req.body

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
