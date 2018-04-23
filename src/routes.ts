import {Router} from 'express'

import authRouter from './modules/auth/routes'
import postRouter from './modules/post/routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/posts', postRouter)

router.all('*', (req, res) => res.sendStatus(404))

export default router
