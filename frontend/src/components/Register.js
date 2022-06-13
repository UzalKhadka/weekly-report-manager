import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'

import { register } from '../actions/userActions'
import { listDepartments } from '../actions/departmentActions'

import Loader from './Loader'
import Message from './Message'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

const theme = createTheme()

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [department, setDepartment] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const departmentList = useSelector((state) => state.listDepartments)
  const {
    loading: departmentLoading,
    error: departmentError,
    departments,
  } = departmentList

  useEffect(() => {
    dispatch(listDepartments())
  }, [dispatch])

  useEffect(() => {
    if (userInfo) {
      setMessage('Registered successfully! Redirecting to the home page...')
      navigate('/')
    }
  }, [userInfo, navigate])

  const signupHandler = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      alert('Passwords do not match')
    } else if (!department) {
      setMessage('Please select a department')
    } else {
      // dispatch the register action
      dispatch(register(name, email, password, department))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {(loading || departmentLoading) && <Loader />}

      {(error || departmentError) && (
        <div
          style={{
            marginTop: '10px',
          }}
        >
          <Message variant='error' children={error || departmentError} />
        </div>
      )}

      {message && (
        <div
          style={{
            marginTop: '10px',
          }}
        >
          <Message variant='error' children={message} />
        </div>
      )}

      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#063970' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='fullName'
                  required
                  fullWidth
                  id='fullName'
                  label='Full Name'
                  autoFocus
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  // pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(american-technology.net)$"
                  autoComplete='email'
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>

              {/* password section */}
              <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword(!showPassword)}
                          // onMouseDown={(event) => event.preventDefault()}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>
              </Grid>

              {/* Confirm password field */}
              <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          // onMouseDown={(event) => event.preventDefault()}
                          edge='end'
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>
              </Grid>

              {/* department field */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Department
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={department}
                    label='Department'
                    onChange={(event) => setDepartment(event.target.value)}
                  >
                    {departments &&
                      departments.map((dept) => (
                        <MenuItem key={dept._id} value={dept._id}>
                          {dept.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 1 }}
              onClick={signupHandler}
            >
              Sign Up
            </Button>

            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='body1' color='textSecondary' align='left'>
              Already have an account?{' '}
            </Typography>
            <Button
              fullWidth
              variant='outlined'
              sx={{ mb: 2 }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Signup
