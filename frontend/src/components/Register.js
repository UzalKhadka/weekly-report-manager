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
import { Divider } from '@mui/material'

import { register } from '../actions/userActions'

const theme = createTheme()

const Signup = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

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
    } else {
      // dispatch the register action
      dispatch(register(name, email, password))
    }
  }

  return (
    <ThemeProvider theme={theme}>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='Confirm password'
                  label='Confirm password'
                  type='password'
                  id='confirmPassword'
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
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
