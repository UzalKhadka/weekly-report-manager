import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  employeeListReducer,
} from './reducers/userReducers'

import {
  createReportReducer,
  getReportDetailsReducer,
  listReportsByEmployeeReducer,
  updateReportReducer,
  adminUpdateReportReducer,
  deleteReportReducer,
} from './reducers/reportReducers'

// creating a reducer by combining all the reducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,

  employeeList: employeeListReducer,
  createReport: createReportReducer,
  getReportDetails: getReportDetailsReducer,
  listReportsByEmployee: listReportsByEmployeeReducer,
  updateReport: updateReportReducer,
  adminUpdateReport: adminUpdateReportReducer,
  deleteReport: deleteReportReducer,
})

// check whether there is any information of user in local storage
// and retreive it
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// set up the initial state
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

// needed middlewares
const middleware = [thunk]

// creating a store
const store = configureStore({
  reducer,
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

export default store
