import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
// import { usePagination } from '@mui/material/Pagination'
import Pagination from '@mui/material/Pagination'
import { makeStyles } from '@material-ui/core'

import { listEmployees, listEmployeesNameIdDept } from '../actions/userActions'

import SearchBar from './SearchBar'
import Loader from './Loader'
import Message from './Message'
import { ATC_COLOR } from './utilities'

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

const useStyles = makeStyles(() => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: ATC_COLOR.primary,
      // '&:hover': {
      //   backgroundColor: ATC_COLOR.primaryLight,
      //   color: ATC_COLOR.white,
      // },
    },
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: ATC_COLOR.primary,
      color: ATC_COLOR.white,
    },
  },
}))

const EmployeeList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams

  let [pageNumber, setPageNumber] = useState(params.pageNumber || 1)

  const classes = useStyles()

  const employeeList = useSelector((state) => state.employeeList)
  const { loading, error, employees, pages, page } = employeeList

  const employeeNameIdDeptList = useSelector(
    (state) => state.employeeNameIdDeptList
  )
  const {
    loading: employeeNameIdDeptListLoading,
    error: employeeNameIdDeptListError,
    employees: employeeNameIdDeptListEmployees,
  } = employeeNameIdDeptList

  useEffect(() => {
    dispatch(listEmployees(pageNumber))
    dispatch(listEmployeesNameIdDept())
  }, [dispatch, pageNumber])

  const profileHandler = (id) => {
    navigate(`/employee/${id}`)
  }

  const viewLastUpdatedReportHandler = (employee_id, report_id) => {
    navigate(`/employee/${employee_id}/view-report/${report_id}`)
  }

  return (
    <div
      style={{
        margin: '0 50px',
        marginTop: '80px',
        marginBottom: '20px',
      }}
    >
      {(loading || employeeNameIdDeptListLoading) && <Loader />}

      {(error || employeeNameIdDeptListError) && (
        <div
          style={{
            marginTop: '10px',
          }}
        >
          <Message
            variant='error'
            children={error || employeeNameIdDeptListError}
          />
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '10px',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <span
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#063970',
            cursor: 'default',
          }}
        >
          Our Employees
        </span>
        <SearchBar
          data={employeeNameIdDeptListEmployees}
          placeholder='Search Employees'
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>SN</StyledTableCell>
              <StyledTableCell>Employee Name</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell align='right'>Last Updated Date</StyledTableCell>
              <StyledTableCell align='right'>
                Last Updated Report
              </StyledTableCell>
              <StyledTableCell align='right'>View All Reports</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees &&
              employees.map((employee, index) => (
                <StyledTableRow key={employee._id}>
                  <StyledTableCell component='th' scope='row'>
                    {index + 1 + (page - 1) * 10}
                  </StyledTableCell>

                  <StyledTableCell component='th' scope='row'>
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => profileHandler(employee._id)}
                      onMouseEnter={(e) =>
                        (e.target.style.textDecoration = 'underline')
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.textDecoration = 'none')
                      }
                    >
                      {employee.name}
                    </p>
                  </StyledTableCell>

                  <StyledTableCell component='th' scope='row'>
                    {employee.department.name}
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
                        style={{ backgroundColor: ATC_COLOR.primary }}
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
                      <>No Reports</>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Button
                      variant='contained'
                      style={{ backgroundColor: ATC_COLOR.primary }}
                      onClick={() => profileHandler(employee._id)}
                    >
                      View
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Pagination
          classes={{ ul: classes.ul }}
          count={pages}
          size='large'
          page={pageNumber}
          onChange={(event, value) => setPageNumber(value)}
        />
      </div>
    </div>
  )
}

export default EmployeeList
