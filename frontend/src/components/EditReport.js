import React, { useState, useEffect } from 'react'
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

import { getReportDetails, updateReport } from '../actions/reportActions'
import { getUserDetails } from '../actions/userActions'
import UserProfileCard from './UserProfileCard'
import { Divider } from '@mui/material'
import { REPORT_UPDATE_RESET } from '../constants/reportConstants'

import Loader from './Loader'
import Message from './Message'
import { ATC_COLOR } from './utilities'

const theme = createTheme()

const EditReport = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [score, setScore] = useState(0)
  const [hoursWorked, setHoursWorked] = useState(0)
  const [remarks, setRemarks] = useState('')

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

  const updateReportSelector = useSelector((state) => state.updateReport)
  const {
    loading: updateReportLoading,
    error: updateReportError,
    success: updateReportSuccess,
  } = updateReportSelector

  useEffect(() => {
    if (!report) {
      dispatch(getUserDetails(user_id))
      dispatch(getReportDetails(report_id))
    } else {
      setStartDate(report.start_date)
      setEndDate(report.end_date)
      setTask(report.task)
      setDescription(report.description)
      setScore(report.satisfactory_score)
      setHoursWorked(report.hours_worked)
      setRemarks(report.remarks)
    }

    if (updateReportSuccess) {
      dispatch({ type: REPORT_UPDATE_RESET })
      navigate(`/employee/${user_id}`)
    }
  }, [
    dispatch,
    user_id,
    report_id,
    report,
    user,
    updateReportSuccess,
    navigate,
  ])

  const backButtonHandler = () => {
    if (userInfo && userInfo.role === 'Admin') {
      navigate(`/employee/${user_id}`)
    } else if (userInfo && userInfo.role === 'Employee') {
      navigate(`/employee/${userInfo._id}`)
    } else {
      navigate('/')
    }
  }

  const editReportHandler = (event) => {
    event.preventDefault()

    if (
      report &&
      report._id &&
      startDate &&
      endDate &&
      task &&
      description &&
      score &&
      hoursWorked &&
      remarks
    ) {
      alert('Report Edited Successfully')

      dispatch(
        updateReport(
          report._id,
          startDate,
          endDate,
          task,
          description,
          score,
          hoursWorked,
          remarks
        )
      )
    } else {
      alert('Please ensure all the fields are Entered and Valid')
    }
  }

  return (
    <div
      style={{
        margin: '0 50px',
        marginTop: '100px',
      }}
    >
      {(loading ||
        userDetailsLoading ||
        reportDetailsLoading ||
        updateReportLoading) && <Loader />}

      <Button
        style={{
          background: ATC_COLOR.secondary,
          color: 'white',
          height: '50px',
          marginTop: '-20px',
          padding: '0 20px',
        }}
        onClick={() =>
          navigate(`/employee/${user_id}/view-report/${report_id}`)
        }
      >
        Go Back
      </Button>

      {(error ||
        userDetailsError ||
        reportDetailsError ||
        updateReportError) && (
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: ATC_COLOR.primary }}>
                <AssessmentIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Edit Your Report
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
                          value={startDate}
                          onChange={(e) => setStartDate(e)}
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                          )}
                        />
                        <DatePicker
                          views={['day']}
                          label='End Date'
                          value={endDate}
                          onChange={(e) => setEndDate(e)}
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                          )}
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
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                      value={score}
                      onChange={(event, newValue) => {
                        setScore(newValue)
                      }}
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
                      value={hoursWorked}
                      onChange={(e) => {
                        setHoursWorked(e.target.value)
                      }}
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
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
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

                {userInfo.role === 'Employee' ? (
                  <>
                    {!report.is_received && (
                      <>
                        <Button
                          fullWidth
                          variant='contained'
                          sx={{ mb: 2, background: ATC_COLOR.primary }}
                          onClick={editReportHandler}
                        >
                          Update
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
                  Cancel
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  )
}

export default EditReport
