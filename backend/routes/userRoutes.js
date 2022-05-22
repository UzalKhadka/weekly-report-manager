import express from 'express'
import {
  getUsers,
  getUserById,
  userLogin,
  userRegister,
  deleteUser,
} from '../controllers/userControllers.js'
import { isAuth, isAdmin } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/').post(userRegister).get(isAuth, isAdmin, getUsers)
router.route('/login').post(userLogin)
router
  .route('/:id')
  .get(isAuth, getUserById)
  .delete(isAuth, isAdmin, deleteUser)

export default router
