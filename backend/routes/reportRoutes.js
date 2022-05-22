import express from 'express'
import {
  createReport,
  deleteReport,
  getRecentReportByUserId,
  getReportById,
  getReports,
  getReportsByUserId,
  updateReport,
} from '../controllers/reportControllers.js'

import { isAuth, isEmployee } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/').get(isAuth, getReports).post(isAuth, isEmployee, createReport)
router
  .route('/:id')
  .get(isAuth, getReportById)
  .put(isAuth, updateReport)
  .delete(isAuth, isEmployee, deleteReport)
router.route('/user/:id').get(isAuth, getReportsByUserId)
router.route('/recent/user/:id').get(isAuth, getRecentReportByUserId)

export default router
