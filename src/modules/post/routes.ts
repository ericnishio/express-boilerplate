import {Router} from 'express'

import createPost from './handlers/createPost'
import getPost from './handlers/getPost'
import {auth} from '../auth/middlewares'

const router = Router()

router.post('/', [auth], createPost)
router.get('/:id', getPost)

export default router
