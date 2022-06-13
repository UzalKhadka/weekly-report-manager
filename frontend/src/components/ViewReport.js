import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AssessmentIcon from '@mui/icons-material/Assessment'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Rating from '@mui/material/Rating'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Stack from '@mui/material/Stack'

import {
  deleteReport,
  getReportDetails,
  updateReportByAdmin,
} from '../actions/reportActions'
import { getUserDetails } from '../actions/userActions'
import UserProfileCard from './UserProfileCard'
import { Divider } from '@mui/material'

import Loader from './Loader'
import Message from './Message'
import { ATC_COLOR } from './utilities'

const theme = createTheme()

const ViewReport = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user_id, report_id } = useParams()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const {
    loading: userDetailsLoading,
    error: userDetailsError,
    user,
  } = userDetails

  const reportDetails = useSelector((state) => state.getReportDetails)
  const {
    loading: reportDetailsLoading,
    error: reportDetailsError,
    report,
  } = reportDetails

  const backButtonHandler = () => {
    if (userInfo && userInfo.role === 'Admin') {
      navigate(`/employee/${user_id}`)
    } else if (userInfo && userInfo.role === 'Employee') {
      navigate(`/employee/${userInfo._id}`)
    }
  }

  useEffect(() => {
    dispatch(getUserDetails(user_id))

    dispatch(getReportDetails(report_id))
  }, [dispatch, user_id, report_id])

  const editReportHandler = (event) => {
    event.preventDefault()
    navigate(`/employee/${user_id}/edit-report/${report_id}`)
  }

  const deleteReportHandler = (employee_id, report_id) => {
    dispatch(deleteReport(report_id))
    alert('Report Deleted Successfully')

    navigate(`/employee/${employee_id}`)
  }
  const approveReportHandler = (event, id) => {
    event.preventDefault()
    dispatch(updateReportByAdmin(id, true))
    alert('Report Approved Successfully')
    navigate(`/employee/${user_id}`)
  }

  const rejectReportHandler = (event, id) => {
    event.preventDefault()
    dispatch(updateReportByAdmin(id, false))
    alert('Report Rejected Successfully')
    navigate(`/employee/${user_id}`)
  }

  return (
    <div
      style={{
        margin: '0 50px',
        marginTop: '100px',
      }}
    >
      {(loading || userDetailsLoading || reportDetailsLoading) && <Loader />}

      <Button
        style={{
          background: ATC_COLOR.secondary,
          color: 'white',
          height: '50px',
          marginTop: '-20px',
          padding: '0 20px',
        }}
        onClick={backButtonHandler}
      >
        Go Back
      </Button>

      {(error || userDetailsError || reportDetailsError) && (
        <div
          style={{
            marginTop: '10px',
          }}
        >
          <Message
            variant='error'
            children={error || userDetailsError || reportDetailsError}
          />
        </div>
      )}

      {userDetails && (
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

      {report && (
        <ThemeProvider theme={theme}>
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: ATC_COLOR.primary }}>
                <AssessmentIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                {user.name}'s Report
              </Typography>
              <Box noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {/* Date */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DatePicker
                          views={['day']}
                          label='Start Date'
                          value={report.start_date}
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                          )}
                          readOnly
                        />
                        <DatePicker
                          views={['day']}
                          label='End Date'
                          value={report.end_date}
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                          )}
                          readOnly
                        />
                      </Stack>
                    </LocalizationProvider>
                    {/* Date */}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='task'
                      required
                      fullWidth
                      id='task'
                      label='Task Name'
                      autoFocus
                      value={report.task}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='description'
                      label='Description'
                      name='description'
                      multiline
                      rows={4}
                      value={report.description}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        '& > legend': { mt: 2 },
                      }}
                    />
                    <Typography component='legend'>
                      Satisfactory Score
                    </Typography>
                    <Rating
                      name='simple-controlled'
                      readOnly
                      value={report.satisfactory_score}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='hours'
                      label='Hours Worked'
                      name='hours'
                      type='number'
                      value={report.hours_worked}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name='remarks'
                      label='Remarks'
                      type='text'
                      id='remark'
                      value={report.remarks}
                      readOnly
                    />
                  </Grid>
                </Grid>

                {report && report.is_received ? (
                  report.is_approved ? (
                    <span
                      style={{
                        color: ATC_COLOR.green,
                        padding: '9px',
                        border: `1px solid ${ATC_COLOR.green}`,
                        borderRadius: '5px',
                        cursor: 'default',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '20px 0',
                      }}
                    >
                      Status: Approved
                    </span>
                  ) : (
                    <span
                      style={{
                        color: ATC_COLOR.red,
                        padding: '9px',
                        border: `1px solid ${ATC_COLOR.red}`,
                        borderRadius: '5px',
                        cursor: 'default',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '20px 0',
                      }}
                    >
                      Status: Rejected
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
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '20px 0',
                    }}
                  >
                    Status: Pending
                  </span>
                )}

                <Divider sx={{ background: '#000000', mb: 2 }} />

                {userInfo.role === 'Admin' ? (
                  <>
                    {!report.is_received && (
                      <>
                        <Button
                          fullWidth
                          variant='contained'
                          sx={{ mb: 2, background: ATC_COLOR.primary }}
                          onClick={(event) => {
                            approveReportHandler(event, report._id)
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          fullWidth
                          variant='outlined'
                          sx={{ mb: 2 }}
                          onClick={(event) => {
                            rejectReportHandler(event, report._id)
                          }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </>
                ) : userInfo.role === 'Employee' ? (
                  <>
                    {!report.is_received && (
                      <>
                        <Button
                          fullWidth
                          variant='contained'
                          sx={{ mb: 2, background: ATC_COLOR.primary }}
                          onClick={editReportHandler}
                        >
                          Edit
                        </Button>
                        <Button
                          fullWidth
                          variant='outlined'
                          sx={{ mb: 2 }}
                          onClick={() => {
                            deleteReportHandler(user._id, report._id)
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

                <Button
                  fullWidth
                  variant='contained'
                  sx={{ mb: 2 }}
                  style={{
                    background: ATC_COLOR.secondary,
                    marginBottom: '20px',
                  }}
                  onClick={backButtonHandler}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  )
}

export default ViewReport
