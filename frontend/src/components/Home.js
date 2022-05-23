import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { SnackbarProvider, useSnackbar } from 'notistack'

import Loader from './Loader'
import Message from './Message'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const { enqueueSnackbar } = useSnackbar()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.role === 'Admin') {
      navigate('/employee-list')
    } else if (userInfo.role === 'Employee') {
      navigate(`/employee/${userInfo._id}`)
    } else {
      navigate('/404')
    }
  }, [dispatch, userInfo, navigate])

  return (
    <div style={{ marginTop: '100px' }}>
      {loading && <Loader />}
      {error && <Message variant='error' children={error} />}
    </div>
  )
}

export default Home
