// @flow

import {findUserByUsername} from '$db/repositories/userRepository'
import {validatePassword, generateAccessToken} from './helpers'

import type {$Request, $Response} from 'express'
import type {Credentials} from '$modules/auth/types'

export default async (req: $Request, res: $Response) => {
  const {username, password}: Credentials = (req.body: any)

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
