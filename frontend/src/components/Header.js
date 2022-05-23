import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { AppBar, Button, Toolbar, Typography } from '@mui/material'

import atclogo from './atc.png'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
      <AppBar sx={{ background: '#063970' }}>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <Link to='/'>
              <img src={atclogo} height='60px' alt='ATC Logo' />
            </Link>
            <span>
              <Typography sx={{ fontSize: '1.8rem' }}>
                Weekly Report Manager
              </Typography>
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            {userInfo && userInfo.role === 'Admin' ? (
              <>
                <Link to={'/employee-list'} style={{ textDecoration: 'none' }}>
                  <Button
                    variant='text'
                    style={{
                      fontSize: '1.2rem',
                      color: '#ffffff',
                      textTransform: 'none',
                    }}
                  >
                    Employees
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {userInfo && userInfo.role === 'Employee' ? (
                  <>
                    <Link
                      to={`/employee/${userInfo._id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant='text'
                        style={{
                          fontSize: '1.2rem',
                          color: '#ffffff',
                          textTransform: 'none',
                        }}
                      >
                        Profile
                      </Button>
                    </Link>
                    <Link
                      to={`/employee/${userInfo._id}/new-report`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant='text'
                        style={{
                          fontSize: '1.2rem',
                          color: '#ffffff',
                          textTransform: 'none',
                        }}
                      >
                        Create Report
                      </Button>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            {userInfo ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '1.4rem',
                    color: '#ffffff',
                    textTransform: 'none',
                    cursor: 'default',
                  }}
                >
                  {userInfo.name}
                </span>
                <Button
                  sx={{
                    marginLeft: 'auto',
                    fontSize: '1.2rem',
                    textTransform: 'none',
                  }}
                  variant='contained'
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                }}
              >
                <Link to='/login' style={{ textDecoration: 'none' }}>
                  <Button
                    style={{
                      marginLeft: 'auto',
                      fontSize: '1.2rem',
                      textTransform: 'none',
                    }}
                    variant='contained'
                  >
                    Login
                  </Button>
                </Link>

                <Link to='/register' style={{ textDecoration: 'none' }}>
                  <Button
                    style={{
                      marginLeft: 'auto',
                      fontSize: '1.2rem',
                      textTransform: 'none',
                    }}
                    variant='contained'
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
