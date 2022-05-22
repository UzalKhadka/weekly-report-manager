import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import { listEmployees, deleteUser } from '../actions/userActions'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const EmployeeList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const employeeList = useSelector((state) => state.employeeList)
  const { loading, error, employees } = employeeList

  useEffect(() => {
    dispatch(listEmployees())
  }, [dispatch])

  const profileHandler = (id) => {
    navigate(`/employee/${id}`)
  }

  const employeeDeleteHandler = (id, name) => {
    let input = prompt(`Please enter the ID of ${name}`)

    if (input.trim() === id) {
      alert('Employee deleted')
      dispatch(deleteUser(id))
      dispatch(listEmployees())
    } else {
      alert(`The entered ID does not match with ${name}'s ID`)
    }
  }

  const viewLastUpdatedReportHandler = (employee_id, report_id) => {
    navigate(`/employee/${employee_id}/view-report/${report_id}`)
  }

  return (
    <>
      <p>p</p>
      <p>p</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee Name</StyledTableCell>
              <StyledTableCell align='right'>Last Updated Date</StyledTableCell>
              <StyledTableCell align='right'>
                Last Updated Report
              </StyledTableCell>
              <StyledTableCell align='right'>View All Reports</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees &&
              employees.map((employee) => (
                <StyledTableRow key={employee._id}>
                  <StyledTableCell component='th' scope='row'>
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => profileHandler(employee._id)}
                    >
                      {employee.name}
                    </p>
                  </StyledTableCell>

                  <StyledTableCell align='right'>
                    {employee.recently_created_report_date
                      ? new Date(
                          employee.recently_created_report_date
                        ).toLocaleDateString('en-US')
                      : 'No Reports'}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {employee.recently_created_report_id ? (
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() =>
                          viewLastUpdatedReportHandler(
                            employee._id,
                            employee.recently_created_report_id
                          )
                        }
                      >
                        View
                      </Button>
                    ) : (
                      <Button>No Reports</Button>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => profileHandler(employee._id)}
                    >
                      View
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={() =>
                        employeeDeleteHandler(employee._id, employee.name)
                      }
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default EmployeeList
