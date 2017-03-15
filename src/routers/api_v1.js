
import express from 'express'
import { userPolice, notebookPolice } from '../polices/api_v1'
import { userApi, notebookApi } from '../api/v1'

const router = express.Router()

router.post( '/register',            userPolice.register,            userApi.register           )
router.post( '/login',               userPolice.login,               userApi.login              )
router.post( '/accesstoken',         userPolice.accessToken,         userApi.accessToken        )
router.post( '/syncdata',            userPolice.syncDataRequest,     userApi.syncDataRequest    )
router.post( '/syncdata/send',       userPolice.syncDataSend,        userApi.syncDataSend       )
//router.get ( '/syncdata',            userPolice.syncDataByGet,       userApi.syncDataByGet      )
//router.post( '/syncdata',            userPolice.syncDataByPost                                  )

router.post( '/notebook/create',                notebookPolice.create,          notebookApi.create         )
router.get ( '/notebook/list',                  notebookPolice.list,            notebookApi.list           )
router.get ( '/notebook/remove/:notebook',      notebookPolice.remove,          notebookApi.remove         )
router.post( '/notebook/:notebook',             notebookPolice.edit,            notebookApi.edit           )

export default router




