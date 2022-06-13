import React, { useEffect, useState } from 'react'
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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import UserProfileCard from './UserProfileCard'
import { deleteUser, getUserDetails } from '../actions/userActions'
import {
  deleteReport,
  listReportsByEmployee,
  updateReportByAdmin,
} from '../actions/reportActions'

import { makeStyles } from '@material-ui/core'

import Loader from './Loader'
import Message from './Message'
import { ATC_COLOR } from './utilities'
import { Pagination } from '@mui/material'

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

const useStyles = makeStyles(() => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: ATC_COLOR.primary,
      // '&:hover': {
      //   backgroundColor: ATC_COLOR.primaryLight,
      //   color: ATC_COLOR.white,
      // },
    },
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: ATC_COLOR.primary,
      color: ATC_COLOR.white,
    },
  },
}))

const EmployeeReports = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = params

  let [pageNumber, setPageNumber] = useState(params.pageNumber || 1)

  const classes = useStyles()

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
    pages,
    page,
  } = getReportsByEmployee

  useEffect(() => {
    dispatch(getUserDetails(id))
    dispatch(listReportsByEmployee(id, pageNumber))
  }, [dispatch, id, pageNumber])

  const employeeDeleteHandler = (id, userRole) => {
    if (userRole === 'Admin') {
      dispatch(deleteUser(id))
      alert('Employee deleted')
      navigate('/employee-list')
    } else {
      alert('Not Authorized')
    }
  }

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
          variant='contained'
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

      {(error || errorReports) && (
        <div
          style={{
            marginTop: '10px',
          }}
        >
          <Message variant='error' children={error || errorReports} />
        </div>
      )}

      {user && user.department && (
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

      {/* Eployee Edit / Delete buttons */}
      {userInfo.role === 'Admin' ? (
        <Button
          variant='contained'
          style={{
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: ATC_COLOR.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '250px',
          }}
          onClick={() => {
            employeeDeleteHandler(id, userInfo.role)
          }}
        >
          {<DeleteIcon style={{ height: '16px' }} />} Delete Employee
        </Button>
      ) : (
        <>
          {id === userInfo._id ? (
            <>
              <Button
                variant='contained'
                style={{
                  padding: '10px',
                  marginBottom: '20px',
                  backgroundColor: ATC_COLOR.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '150px',
                }}
              >
                {<EditIcon style={{ height: '16px' }} />} Edit Profile
              </Button>
            </>
          ) : (
            <></>
          )}
        </>
      )}

      {/* add report button for employees */}
      {userInfo && userInfo.role === 'Employee' && (
        <Button
          variant='contained'
          style={{
            padding: '10px',
            backgroundColor: ATC_COLOR.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '150px',
          }}
          onClick={newReportHandler}
        >
          {<AddIcon />} New Report
        </Button>
      )}

      {/* Employee's list of reports */}
      <TableContainer component={Paper} style={{ margin: '20px 0' }}>
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
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell>View Report</StyledTableCell>
              <StyledTableCell>Approval Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reports &&
              reports.map((report, index) => (
                <StyledTableRow key={report._id}>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{ verticalAlign: 'top', paddingTop: '24px' }}
                  >
                    {index + 1 + (page - 1) * 10}
                  </StyledTableCell>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{ verticalAlign: 'top', paddingTop: '24px' }}
                  >
                    {new Date(report.start_date).toLocaleDateString('en-US')}
                  </StyledTableCell>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{ verticalAlign: 'top', paddingTop: '24px' }}
                  >
                    {new Date(report.end_date).toLocaleDateString('en-US')}
                  </StyledTableCell>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{
                      verticalAlign: 'top',
                      paddingTop: '24px',
                      maxWidth: '100px',
                      overflow: 'hidden',
                    }}
                  >
                    {report.task}
                  </StyledTableCell>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{
                      verticalAlign: 'top',
                      paddingTop: '24px',
                    }}
                  >
                    {report.description}
                  </StyledTableCell>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{ verticalAlign: 'top', paddingTop: '24px' }}
                  >
                    {report.satisfactory_score}
                  </StyledTableCell>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{ verticalAlign: 'top', paddingTop: '24px' }}
                  >
                    {report.hours_worked}
                  </StyledTableCell>

                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{ verticalAlign: 'top', paddingTop: '24px' }}
                  >
                    {report.remarks}
                  </StyledTableCell>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{ verticalAlign: 'top' }}
                  >
                    <Button
                      variant='contained'
                      style={{
                        backgroundColor: ATC_COLOR.primary,
                      }}
                      onClick={() => {
                        reportOpener(report._id)
                      }}
                    >
                      View
                    </Button>
                  </StyledTableCell>

                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{ verticalAlign: 'top', paddingTop: '24px' }}
                  >
                    {report.is_received ? (
                      report.is_approved ? (
                        <span
                          style={{
                            color: ATC_COLOR.green,
                            padding: '9px',
                            border: `1px solid ${ATC_COLOR.green}`,
                            borderRadius: '5px',
                            cursor: 'default',
                          }}
                        >
                          Approved
                        </span>
                      ) : (
                        <span
                          style={{
                            color: ATC_COLOR.red,
                            padding: '9px',
                            border: `1px solid ${ATC_COLOR.red}`,
                            borderRadius: '5px',
                            cursor: 'default',
                          }}
                        >
                          Rejected
                        </span>
                      )
                    ) : (
                      <span
                        style={{
                          color: ATC_COLOR.greenMidnight,
                          padding: '9px',
                          border: `1px solid ${ATC_COLOR.greenMidnight}`,
                          borderRadius: '5px',
                          cursor: 'default',
                        }}
                      >
                        Pending
                      </span>
                    )}
                  </StyledTableCell>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    style={{ verticalAlign: 'top' }}
                  >
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

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0',
        }}
      >
        <Pagination
          classes={{ ul: classes.ul }}
          count={pages}
          size='large'
          page={pageNumber}
          onChange={(event, value) => setPageNumber(value)}
        />
      </div>
    </div>
  )
}

export default EmployeeReports
