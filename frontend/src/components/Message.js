import { Alert } from '@mui/material'
import React from 'react'

const Message = ({ variant, children }) => {
  return (
    <Alert severity={variant} style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ fontSize: '18px' }}>{children}</span>
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
  // variants = ['error', 'warning', 'info', 'success']
}

export default Message
