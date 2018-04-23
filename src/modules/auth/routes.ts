import {Router} from 'express'

import register from './handlers/register'
import login from './handlers/login'
import verify from './handlers/verify'
import refresh from './handlers/refresh'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/verify', verify)
router.post('/refresh', refresh)

export default router
