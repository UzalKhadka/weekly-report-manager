import { CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress
        style={{
          color: '#063970',
          height: '80px',
          width: '80px',
          position: 'fixed',
          top: '50%',
          left: 'calc(50%-40px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

export default Loader
