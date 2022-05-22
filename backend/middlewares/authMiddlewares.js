import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'

import User from '../models/userModel.js'

dotenv.config()

export const isAuth = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not Authorized, token failed')
    }
  } else {
    res.status(403)
    throw new Error('Not Authorized, no token found')
  }
})

// authenticate based on roles
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === process.env.ADMIN_ROLE) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorized as an Admin')
  }
}

export const isEmployee = (req, res, next) => {
  if (req.user && req.user.role === process.env.EMPLOYEE_ROLE) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorized as an Employee')
  }
}

// export const isAssociate = (req, res, next) => {
//   if (req.user && req.user.role === env.ASSOCIATE_ROLE) {
//     next()
//   } else {
//     res.status(401)
//     throw new Error('Not Authorized as an Associate')
//   }
// }
