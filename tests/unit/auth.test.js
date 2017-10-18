// @flow

import {hashPassword, validatePassword} from '$modules/auth/helpers'

describe('auth', () => {
  it('should validate password', async () => {
    const password = 'abcdefg1234567'
    const hash = await hashPassword(password)

    await validatePassword(password, hash)
  })

  it('should fail to validate password', async () => {
    const password = 'abcdefg1234567'
    const hash = await hashPassword(password)

    try {
      await validatePassword('different password', hash)
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
