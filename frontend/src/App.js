import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import EmployeeList from './components/EmployeeList'
import EmployeeReports from './components/EmployeeReports'
import CreateReport from './components/CreateReport'
import ViewReport from './components/ViewReport'
import EditReport from './components/EditReport'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/employee-list' element={<EmployeeList />} />
          <Route path='/employee/:id' element={<EmployeeReports />} />
          <Route path='/employee/:id/new-report' element={<CreateReport />} />
          <Route
            path='/employee/:user_id/view-report/:report_id'
            element={<ViewReport />}
          />
          <Route
            path='/employee/:user_id/edit-report/:report_id'
            element={<EditReport />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
