import {Router} from 'express'

import authRouter from './modules/auth/routes'
import postRouter from './modules/post/routes'
import notFound from './modules/error/handlers/404'

const router = Router()

router.use('/auth', authRouter)
router.use('/posts', postRouter)
router.all('*', notFound)

export default router
