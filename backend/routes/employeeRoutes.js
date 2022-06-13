import express from 'express'
import {
  getEmployees,
  getEmployeesWithLatestReport,
  getEmployeesNamesIdDept,
} from '../controllers/userControllers.js'
import { isAuth, isAdmin } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/').get(isAuth, isAdmin, getEmployees)
router
  .route('/latest-reports')
  .get(isAuth, isAdmin, getEmployeesWithLatestReport)

router
  .route('/employees-name-id-dept')
  .get(isAuth, isAdmin, getEmployeesNamesIdDept)

export default router
