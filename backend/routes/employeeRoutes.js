import express from 'express'
import {
  getEmployees,
  getEmployeesWithLatestReport,
} from '../controllers/userControllers.js'
import { isAuth, isAdmin } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/').get(isAuth, isAdmin, getEmployees)
router.route('/latest-reports').get(getEmployeesWithLatestReport)
// .get(isAuth, isAdmin, getEmployeesWithLatestReport)

export default router
