import asyncHandler from 'express-async-handler'
import Report from '../models/reportModel.js'
import User from '../models/userModel.js'
import dotenv from 'dotenv'

dotenv.config()

// Report Controllers
// CRUD operations
// getReports - get all reports
// getReportById - get report by id
// getReportsByUserId - get report by user id
// createReport - create report
// updateReport - update report
// deleteReport - delete report

// @desc     Get all reports
// @route    GET /api/reports
// @access   Auth
export const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find()

  if (reports) {
    res.status(200).json(reports)
  } else {
    res.status(404)
    throw new Error('Reports not found')
  }
})

// @desc     Get report by id
// @route    GET /api/reports/:id
// @access   Auth
export const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)

  if (report) {
    res.status(200).json(report)
  } else {
    res.status(404)
    throw new Error('Report not found')
  }
})

// @desc     Get reports by user id
// @route    GET /api/reports/user/:id
// @access   Auth
export const getReportsByUserId = asyncHandler(async (req, res) => {
  const report = await Report.find({ user_id: req.params.id }, '', {
    sort: { start_date: -1 },
  })

  if (report) {
    res.status(200).json(report)
  } else {
    res.status(404)
    throw new Error('Report not found')
  }
})

// @desc     Get the most the recent report by user id
// @route    GET /api/reports/recent/user/:id
// @access   Auth
export const getRecentReportByUserId = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ user_id: req.params.id }, '', {
    sort: { start_date: -1 },
    limit: 1,
  })

  if (report) {
    res.status(200).json(report)
  } else {
    res.status(404)
    throw new Error('Report not found')
  }
})

// @desc     Create report
// @route    POST /api/reports
// @access   Auth
export const createReport = asyncHandler(async (req, res) => {
  const {
    start_date,
    end_date,
    user_id,
    task,
    description,
    hours_worked,
    satisfactory_score,
    remarks,
  } = req.body

  const report = await Report.create({
    start_date,
    end_date,
    user_id,
    task,
    description,
    hours_worked,
    satisfactory_score,
    remarks,
    is_received: false,
    is_approved: false,
  })

  if (report) {
    const user = await User.findById(user_id)

    if (user) {
      user.reports.push(report._id)
      await user.save()
    }

    res.status(201).json(report)
  } else {
    res.status(404)
    throw new Error('Report not found')
  }
})

// @desc     Update report
// @route    PUT /api/reports/:id
// @access   Auth
export const updateReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)

  if (report) {
    if (!report.is_received && !report.is_approved) {
      report.start_date = req.body.start_date || report.start_date
      report.end_date = req.body.end_date || report.end_date
      report.user_id = req.body.user_id || report.user_id
      report.task = req.body.task || report.task
      report.description = req.body.description || report.description
      report.hours_worked = req.body.hours_worked || report.hours_worked
      report.satisfactory_score =
        req.body.satisfactory_score || report.satisfactory_score
      report.remarks = req.body.remarks || report.remarks
      report.is_received = req.body.is_received || report.is_received
      report.is_approved = req.body.is_approved || report.is_approved

      const updatedReport = await report.save()

      if (updatedReport) {
        res.status(200).json(updatedReport)
      } else {
        res.status(404)
        throw new Error('Report not found')
      }
    } else {
      res.status(400)
      throw new Error('Report already approved')
    }
  } else {
    res.status(404)
    throw new Error('Report not found')
  }
})

// @desc     Delete report
// @route    DELETE /api/reports/:id
// @access   Auth
export const deleteReport = asyncHandler(async (req, res) => {
  {
    const report = await Report.findById(req.params.id)

    if (report) {
      if (!report.is_received && !report.is_approved) {
        await report.remove()
        res.status(200).json({
          message: 'Report deleted',
        })
      } else {
        res.status(400)
        throw new Error('Report already approved')
      }
    } else {
      res.status(404)
      throw new Error('Report not found')
    }
  }
})
