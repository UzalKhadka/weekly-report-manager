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

import { createReport } from '../actions/reportActions'
import { REPORT_CREATE_RESET } from '../constants/reportConstants'

import Loader from './Loader'
import Message from './Message'
import { ATC_COLOR } from './utilities'

const theme = createTheme()

const CreateReport = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [score, setScore] = useState(0)
  const [hoursWorked, setHoursWorked] = useState(0)
  const [remarks, setRemarks] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const createReportState = useSelector((state) => state.createReport)
  const {
    loading: loadingReport,
    error: errorReport,
    report,
  } = createReportState

  useEffect(() => {
    if (report) {
      dispatch({ type: REPORT_CREATE_RESET })

      navigate(`/employee/${userInfo._id}`)
    } else {
      dispatch({ type: REPORT_CREATE_RESET })
    }
  }, [userInfo, report, navigate, dispatch])

  const createReportHandler = (event) => {
    event.preventDefault()

    if (userInfo._id !== params.id) {
      alert('Invalid login. Permission denied')
      return
    }

    dispatch(
      createReport(
        startDate,
        endDate,
        task,
        description,
        score,
        parseInt(hoursWorked),
        remarks
      )
    )
  }

  return (
    <ThemeProvider theme={theme}>
      {(loading || loadingReport) && <Loader />}
      <Container
        component='main'
        maxWidth='xs'
        style={{
          marginTop: '100px',
        }}
      >
        <CssBaseline />

        <Button
          style={{
            background: ATC_COLOR.secondary,
            color: 'white',
            height: '50px',
            marginTop: '-20px',
            padding: '0 20px',
          }}
          onClick={() => navigate(`/employee/${userInfo._id}`)}
        >
          Go Back
        </Button>

        {(error || errorReport) && (
          <div
            style={{
              marginTop: '10px',
            }}
          >
            <Message variant='error' children={error || errorReport} />
          </div>
        )}

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
            Add Report
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
                      onChange={(e) => {
                        setStartDate(e)
                      }}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                      )}
                    />
                    <DatePicker
                      views={['day']}
                      label='End Date'
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e)
                      }}
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
                  onChange={(e) => {
                    setTask(e.target.value)
                  }}
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
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                  }}
                />
                <Typography component='legend'>Satisfactory Score</Typography>
                <Rating
                  name='simple-controlled'
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
                  onChange={(e) => {
                    if (e.target.value > 0) setHoursWorked(e.target.value)
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
                  onChange={(e) => {
                    setRemarks(e.target.value)
                  }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, background: ATC_COLOR.primary }}
              onClick={createReportHandler}
            >
              Create Report
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default CreateReport
