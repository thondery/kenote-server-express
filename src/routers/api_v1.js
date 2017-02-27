
import express from 'express'
import { userPolice, notebookPolice } from '../polices/api_v1'
import { userApi, notebookApi } from '../api/v1'

const router = express.Router()

router.post( '/register',        userPolice.register,            userApi.register           )
router.post( '/login',           userPolice.login,               userApi.login              )
router.post( '/accesstoken',     userPolice.accessToken,         userApi.accessToken        )

router.post( '/notebook/create', notebookPolice.create,          notebookApi.create         )

export default router