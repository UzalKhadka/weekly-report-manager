import {
  REPORT_CREATE_REQUEST,
  REPORT_CREATE_SUCCESS,
  REPORT_CREATE_FAIL,
  REPORT_CREATE_RESET,
  REPORT_DETAILS_REQUEST,
  REPORT_DETAILS_SUCCESS,
  REPORT_DETAILS_FAIL,
  REPORT_DETAILS_RESET,
  REPORT_UPDATE_REQUEST,
  REPORT_UPDATE_SUCCESS,
  REPORT_UPDATE_FAIL,
  REPORT_UPDATE_RESET,
  REPORT_ADMIN_UPDATE_REQUEST,
  REPORT_ADMIN_UPDATE_SUCCESS,
  REPORT_ADMIN_UPDATE_FAIL,
  REPORT_ADMIN_UPDATE_RESET,
  REPORT_DELETE_REQUEST,
  REPORT_DELETE_SUCCESS,
  REPORT_DELETE_FAIL,
  REPORT_LIST_BY_EMPLOYEE_REQUEST,
  REPORT_LIST_BY_EMPLOYEE_SUCCESS,
  REPORT_LIST_BY_EMPLOYEE_FAIL,
  REPORT_LIST_BY_EMPLOYEE_RESET,
} from '../constants/reportConstants'

const createReportReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_CREATE_REQUEST:
      return { loading: true }
    case REPORT_CREATE_SUCCESS:
      return { loading: false, report: action.payload }
    case REPORT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case REPORT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

const listReportsByEmployeeReducer = (state = { reports: [] }, action) => {
  switch (action.type) {
    case REPORT_LIST_BY_EMPLOYEE_REQUEST:
      return { loading: true }
    case REPORT_LIST_BY_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: true,
        reports: action.payload.reports,
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case REPORT_LIST_BY_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload }
    case REPORT_LIST_BY_EMPLOYEE_RESET:
      return { reports: [] }
    default:
      return state
  }
}

const getReportDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_DETAILS_REQUEST:
      return { loading: true }
    case REPORT_DETAILS_SUCCESS:
      return { loading: false, success: true, report: action.payload }
    case REPORT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case REPORT_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

const updateReportReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_UPDATE_REQUEST:
      return { loading: true }
    case REPORT_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case REPORT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case REPORT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

const adminUpdateReportReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_ADMIN_UPDATE_REQUEST:
      return { loading: true }
    case REPORT_ADMIN_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case REPORT_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case REPORT_ADMIN_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

const deleteReportReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_DELETE_REQUEST:
      return { loading: true }
    case REPORT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case REPORT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export {
  createReportReducer,
  getReportDetailsReducer,
  updateReportReducer,
  adminUpdateReportReducer,
  deleteReportReducer,
  listReportsByEmployeeReducer,
}
