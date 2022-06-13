import { Avatar, Card, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { getRandomColor, getInitials } from './utilities'

const UserProfileCard = ({ user }) => {
  let color = getRandomColor()

  return (
    <div
      style={{
        margin: '20px 0',
      }}
    >
      <Card
        sx={{
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          border: '1px solid #c4c4c4',
          borderRadius: '10px',
          backgroundColor: '#ececec',
          padding: '10px',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: `${color}` }}>
              {getInitials(`${user.name}`)}
            </Avatar>
          }
          style={{ padding: '0 0 10px 0' }}
          title={user.name}
          subheader={user.department.name}
        ></CardHeader>

        <table
          style={{
            width: '100%',
          }}
        >
          <tr>
            <td style={{ width: '100px' }}>
              <Typography>Name</Typography>
            </td>
            <td>
              <Typography>{user.name}</Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography>Role</Typography>
            </td>
            <td>
              <Typography>{user.role}</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography>Email</Typography>
            </td>
            <td>
              <Typography>{user.email}</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography>Department</Typography>
            </td>
            <td>
              <Typography>{user.department.name}</Typography>
            </td>
          </tr>
        </table>
      </Card>
    </div>
  )
}

export default UserProfileCard

UserProfileCard.defaultProps = {
  user: {
    _id: '',
    name: '',
    email: '',
    department: '',
    role: '',
  },
}
