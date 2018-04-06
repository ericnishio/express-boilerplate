import {hashPassword, validatePassword} from '../../src/modules/auth/helpers'

describe('auth', () => {
  test('validate password', async () => {
    const password = 'abcdefg1234567'
    const hash = await hashPassword(password)

    await validatePassword(password, hash)
  })

  test('fail to validate password', async () => {
    const password = 'abcdefg1234567'
    const hash = await hashPassword(password)

    try {
      await validatePassword('different password', hash)
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
