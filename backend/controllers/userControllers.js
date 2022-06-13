import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'
import dotenv from 'dotenv'

import Report from '../models/reportModel.js'

dotenv.config()

const getUserRole = (role) => {
  switch (role) {
    case process.env.ADMIN_ROLE:
      return 'Admin'
    case process.env.EMPLOYEE_ROLE:
      return 'Employee'
    default:
      return 'Unspecified User'
  }
}

// User Controllers
// CRUD operations
// userLogin - login user
// userLogout - logout user
// userRegister - register user
// getUsers - get all users
// getUserById - get user by id
// getUserProfile - get user profile
// updateUserProfile - update user profile
// deleteUser - delete user

//@desc     Auth a user and get a token
//@route    POST /api/users/login
//@access   Public
export const userLogin = asyncHandler(async (req, res) => {
  // find a user based on email
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // authenticate the user
  if (user && (await user.matchPassword(password))) {
    // return response token with user to frontend client
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: getUserRole(user.role),
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

//@desc     Log out a user
//@route    GET /api/users/logout
//@access   Public
export const userLogout = asyncHandler(async (req, res) => {
  res.clearCookie('userInfo')
  res.json({ message: 'Logout success' })
})

//@desc     Register a new user
//@route    POST /api/users
//@access   Public
export const userRegister = asyncHandler(async (req, res) => {
  // console.log(req.body)
  const { name, email, password, department } = req.body

  // console.log('backend', name, email, password)

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    role: process.env.EMPLOYEE_ROLE,
    department,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: getUserRole(user.role),
      // department: user.department,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}, '', {
    sort: { name: 1 },
  })
    .select('-password')
    .select('-__v')
    .select('-createdAt')
    .select('-updatedAt')
    .populate('reports')
    .populate('department')

  if (users) {
    // only sending the most recent created report
    const usersWithReports = users.map((user) => {
      const userWithReports = user.toObject()

      // changing the roles of the users
      userWithReports.role = getUserRole(user.role)

      // sorting those reports by date
      userWithReports.reports = user.reports.sort((a, b) => {
        return new Date(b.start_date) - new Date(a.start_date)
      })

      // get only the first report
      if (userWithReports.reports[0]) {
        userWithReports.recently_created_report_id =
          userWithReports.reports[0]._id
        userWithReports.recently_created_report_date =
          userWithReports.reports[0].start_date
      } else {
        userWithReports.recently_created_report_id = null
        userWithReports.recently_created_report_date = null
      }

      // delete userWithReports.reports

      return userWithReports
    })

    res.status(200).json(usersWithReports)
  } else {
    res.status(404)
    throw new Error('Users not found')
  }
})

// @desc    Get only employee users
// @route   GET /api/users/employees
// @access  Admin & Associate
export const getEmployees = asyncHandler(async (req, res, next) => {
  const employees = await User.find({ role: process.env.EMPLOYEE_ROLE })
    .select('-password')
    .select('-__v')
    .select('-createdAt')
    .select('-updatedAt')
    .populate('reports')
    .populate('department')

  if (employees) {
    res.json(employees)
  } else {
    res.status(404)
    throw new Error('Employees not found')
  }
})

// @desc    Get only employee users with latest reports data
// @route   GET /api/users/employees/latest-reports
// @access  Admin & Associate
export const getEmployeesWithLatestReport = asyncHandler(
  async (req, res, next) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const employeesCount = await User.countDocuments({
      role: process.env.EMPLOYEE_ROLE,
    })

    const employees = await User.find({ role: process.env.EMPLOYEE_ROLE })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .select('-password')
      .select('-__v')
      .select('-createdAt')
      .select('-updatedAt')
      .populate('reports')
      .populate('department')

    if (employees) {
      // only sending the most recent created report
      const employeesWithReports = employees.map((employee) => {
        const employeeWithReports = employee.toObject()

        // changing the roles of the employees
        employeeWithReports.role = getUserRole(employee.role)

        // sorting those reports by date
        employeeWithReports.reports = employee.reports.sort((a, b) => {
          return new Date(b.start_date) - new Date(a.start_date)
        })

        // get only the first report
        if (employeeWithReports.reports[0]) {
          employeeWithReports.recently_created_report_id =
            employeeWithReports.reports[0]._id
          employeeWithReports.recently_created_report_date =
            employeeWithReports.reports[0].start_date
        } else {
          employeeWithReports.recently_created_report_id = null
          employeeWithReports.recently_created_report_date = null
        }

        delete employeeWithReports.reports

        return employeeWithReports
      })

      res.json({
        employees: employeesWithReports,
        page,
        pages: Math.ceil(employeesCount / pageSize),
      })
    } else {
      res.status(404)
      throw new Error('Employees not found')
    }
  }
)

// @desc    Get a user by id
// @route   GET /api/users/:id
// @access  Private / Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-hashed_password')
    .select('-salt')
    .select('-updatedAt')
    .select('-__v')
    .populate('department')

  if (user) {
    user.role = getUserRole(user.role)

    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.status(200).json({
      message: 'User deleted',
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get only name, id, and department of all employees [for search bar]
// @route   DELETE /api/employees/employees-name-id-dept
// @access  Private / Admin
export const getEmployeesNamesIdDept = asyncHandler(async (req, res) => {
  const employees = await User.find({ role: process.env.EMPLOYEE_ROLE })
    .select('-email')
    .select('-password')
    .select('-role')
    .select('-reports')
    .select('-__v')
    .select('-createdAt')
    .select('-updatedAt')
    .populate('department')

  if (employees) {
    // only sending the name and ids of employees
    res.json(employees)
  } else {
    res.status(404)
    throw new Error('Employees not found')
  }
})
