import asyncHandler from 'express-async-handler'
import Department from '../models/departmentModel.js'
import dotenv from 'dotenv'
import User from '../models/userModel.js'

dotenv.config()

// Department Controllers
// CRUD operations
// getDepartments - GET /api/departments - get all departments
// getDepartmenttById - GET /api/departments/:id - get a single department
// createDepartment - POST /api/departments - create a new department
// updateDepartment - PUT /api/departments/:id - update a department
// deleteDepartment - DELETE /api/departments/:id - delete a department

// @desc     Get departments
// @route    GET /api/departments/
// @access   Public
export const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({ isVisible: true })

  if (departments) {
    res.status(200).json(departments)
  } else {
    res.status(404)
    throw new Error('Departments not found')
  }
})

// @desc     Get ALL departments for Admin
// @route    GET /api/departments/admin-departments
// @access   Public
export const getDepartmentsAdmin = asyncHandler(async (req, res) => {
  const departments = await Department.find()

  if (departments) {
    res.status(200).json(departments)
  } else {
    res.status(404)
    throw new Error('Departments not found')
  }
})

// @desc     Get a department by id
// @route    GET /api/departments/:id
// @access   Public
export const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id)

  if (department) {
    res.status(200).json(department)
  } else {
    res.status(404)
    throw new Error('Department not found')
  }
})

// @desc     Create a department
// @route    POST /api/departments/
// @access   Admin
export const createDepartment = asyncHandler(async (req, res) => {
  const name = req.body.name || ''

  var department = null

  if (name) {
    department = await Department.create(req.body)
  } else {
    res.status(400)
    throw new Error('Please provide the Department name')
  }

  if (department) {
    res.status(201).json(department)
  } else {
    res.status(400)
    throw new Error('Department not created')
  }
})

// @desc     Update a department by id
// @route    POST /api/departments/:id
// @access   Admin
export const updateDepartment = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { name } = req.body

  const department = await Department.findById(id)

  if (department) {
    department.name = name
    await department.save()
  } else {
    res.status(404)
    throw new Error('Department not found')
  }
})

// @desc     Delete a department by id
// @route    DELETE /api/departments/:id
// @access   Admin
export const deleteDepartment = asyncHandler(async (req, res) => {
  const id = req.params.id

  const department = await Department.findById(id)

  if (department) {
    await department.remove()
    res.status(200).json({ message: 'Department deleted' })
  } else {
    res.status(404)
    throw new Error('Department not found')
  }
})
