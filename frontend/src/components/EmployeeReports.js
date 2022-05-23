import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import UserProfileCard from './UserProfileCard'
import { getUserDetails } from '../actions/userActions'
import {
  deleteReport,
  listReportsByEmployee,
  updateReportByAdmin,
} from '../actions/reportActions'

import Loader from './Loader'
import Message from './Message'
import { ATC_COLOR } from './utilities'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const EmployeeReports = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLoginReducer = useSelector((state) => state.userLogin)
  const { userInfo } = userLoginReducer

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const getReportsByEmployee = useSelector(
    (state) => state.listReportsByEmployee
  )
  const {
    loading: loadingReports,
    error: errorReports,
    reports,
  } = getReportsByEmployee

  useEffect(() => {
    dispatch(getUserDetails(id))

    dispatch(listReportsByEmployee(id))
  }, [dispatch, id])

  const reportOpener = (reportId) => {
    navigate(`/employee/${id}/view-report/${reportId}`)
  }

  const newReportHandler = () => {
    navigate(`/employee/${id}/new-report`)
  }

  const approveReportHandler = (reportId) => {
    dispatch(updateReportByAdmin(reportId, true))
    alert('Report Approved Successfully')
    dispatch(listReportsByEmployee(id))
  }

  const rejectReportHandler = (reportId) => {
    dispatch(updateReportByAdmin(reportId, false))
    alert('Report Rejected Successfully')
    dispatch(listReportsByEmployee(id))
  }

  const editReportHandler = (reportId) => {
    navigate(`/employee/${id}/edit-report/${reportId}`)
  }

  const deleteReportHandler = (reportId) => {
    dispatch(deleteReport(reportId))
    alert('Report Deleted Successfully')
    dispatch(listReportsByEmployee(id))
  }

  return (
    <div
      style={{
        margin: '0 50px',
        marginTop: '100px',
      }}
    >
      {(loading || loadingReports) && <Loader />}

      {userInfo && userInfo.role === 'Admin' && (
        <Button
          style={{
            background: ATC_COLOR.secondary,
            color: 'white',
            height: '50px',
            marginTop: '-20px',
            padding: '0 20px',
          }}
          onClick={() => navigate('/employee-list')}
        >
          Go Back
        </Button>
      )}

      {user && (
        <UserProfileCard
          user={{
            _id: user._id,
            name: user.name,
            email: user.email,
            department: user.department,
            role: user.role,
          }}
        />
      )}

      {/* add report button for employees */}
      {userInfo && userInfo.role === 'Employee' && (
        <Button
          variant='contained'
          style={{
            padding: '10px',
            margin: '10px 0',
            marginBottom: '30px',
            backgroundColor: ATC_COLOR.primary,
          }}
          onClick={newReportHandler}
        >
          {<AddIcon />} New Report
        </Button>
      )}

      {/* Employee's list of reports */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>SN</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell align='left'>Task</StyledTableCell>
              <StyledTableCell align='left'>Description</StyledTableCell>
              <StyledTableCell>Satisfactory Score</StyledTableCell>
              <StyledTableCell>Hours Worked</StyledTableCell>
              <StyledTableCell>View Report</StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell>Approval Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reports &&
              reports.map((report, index) => (
                <StyledTableRow key={report._id}>
                  <StyledTableCell component='th' scope='row'>
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {new Date(report.start_date).toLocaleDateString('en-US')}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {new Date(report.end_date).toLocaleDateString('en-US')}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {report.task}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {report.description}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {report.satisfactory_score}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {report.hours_worked}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    <Button
                      variant='contained'
                      style={{ backgroundColor: ATC_COLOR.primary }}
                      onClick={() => {
                        reportOpener(report._id)
                      }}
                    >
                      View
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {report.remarks}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {report.is_received ? (
                      report.is_approved ? (
                        <Button>Approved</Button>
                      ) : (
                        <Button>Rejected</Button>
                      )
                    ) : (
                      <Button>Pending</Button>
                    )}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        {userInfo.role === 'Admin' ? (
                          <>
                            {/* admin's buttons */}
                            {!report.is_received && (
                              <>
                                <Button
                                  variant='outlined'
                                  color='primary'
                                  onClick={() => {
                                    approveReportHandler(report._id)
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant='outlined'
                                  color='primary'
                                  onClick={() => {
                                    rejectReportHandler(report._id)
                                  }}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                          </>
                        ) : userInfo.role === 'Employee' ? (
                          <>
                            {/* employers button */}
                            {!report.is_received && !report.is_approved && (
                              <>
                                <Button
                                  variant='outlined'
                                  color='primary'
                                  onClick={() => {
                                    editReportHandler(report._id)
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant='outlined'
                                  color='primary'
                                  onClick={() => {
                                    deleteReportHandler(report._id)
                                  }}
                                >
                                  Delete
                                </Button>
                              </>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default EmployeeReports
