
import express from 'express'
import { userPolice } from '../polices/api_v1'
import { userApi } from '../api/v1'

const router = express.Router()

router.post( '/register',        userPolice.register,            userApi.register           )
router.post( '/login',           userPolice.login,               userApi.login              )

export default router