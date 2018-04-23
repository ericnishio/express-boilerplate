import {Router} from 'express'

import createPost from './handlers/createPost'
import getPost from './handlers/getPost'
import {authenticate} from '../auth/middlewares'

const router = Router()

router.post('/', [authenticate], createPost)
router.get('/:id', getPost)

export default router
