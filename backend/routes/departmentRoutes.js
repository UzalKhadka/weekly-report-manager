import express from 'express'
import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  getDepartmentsAdmin,
  updateDepartment,
} from '../controllers/departmentControllers.js'

import { isAdmin, isAuth } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/').get(getDepartments).post(isAuth, isAdmin, createDepartment)
router.route('/admin-departments').get(getDepartmentsAdmin)
router
  .route('/:id')
  .get(getDepartmentById)
  .put(isAuth, isAdmin, updateDepartment)
  .delete(isAuth, isAdmin, deleteDepartment)

export default router
