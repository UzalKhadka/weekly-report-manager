import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import DoneIcon from '@mui/icons-material/Done'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { login } from '../actions/userActions'

import Loader from './Loader'
import Message from './Message'
import { ATC_COLOR } from './utilities'

const theme = createTheme()

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }

    if (error) {
      setMessage(error)
    }
  }, [userInfo, navigate, error])

  const submitHandler = (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      alert('Please enter your email and password!')
      setMessage('Please enter your email and password!')
    }
    // dispatch the login action
    dispatch(login(email, password, rememberMe))
  }

  return (
    <ThemeProvider theme={theme}>
      {loading && <Loader />}

      {error && (
        <div
          style={{
            marginTop: '10px',
          }}
        >
          <Message variant='error' children={error} />
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

      <Box
        m={10}
        ml={30}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container component='main' sx={{ height: '70vh', width: '100%' }}>
          {/* <CssBaseline /> */}
          <Grid
            item
            // xs={12}
            // sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              bgcolor: ATC_COLOR.primary,
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 300,
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                component='h1'
                variant='h3'
                align='center'
                sx={{
                  color: 'white',
                  fontSize: '40px',
                }}
              >
                Weekly Report Manager
              </Typography>

              <Typography
                component='h1'
                variant='h3'
                align='center'
                sx={{
                  my: 3,
                  fontWeight: 600,
                  color: 'white',
                  fontSize: '20px',
                }}
              >
                Features:
              </Typography>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'end',
                  gap: '10px',
                  color: 'white',
                }}
              >
                <span
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <DoneIcon style={{ marginRight: '20px' }} />
                  Hassle-free Weekly Reports Management System
                </span>
                <span
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <DoneIcon style={{ marginRight: '20px' }} />
                  Supports Unlimited numbers of Employees
                </span>
                <span
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <DoneIcon style={{ marginRight: '20px' }} />
                  Special Admin and Employee roles
                </span>
              </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: ATC_COLOR.primary }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={submitHandler}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  onChange={(event) => setPassword(event.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2, background: ATC_COLOR.primary }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      variant='body2'
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate('/register')}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default Login
