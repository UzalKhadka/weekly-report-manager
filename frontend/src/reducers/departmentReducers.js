import {
  DEPARTMENT_CREATE_FAIL,
  DEPARTMENT_CREATE_REQUEST,
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_CREATE_RESET,
  DEPARTMENT_DELETE_FAIL,
  DEPARTMENT_DELETE_REQUEST,
  DEPARTMENT_DELETE_SUCCESS,
  DEPARTMENT_DETAILS_FAIL,
  DEPARTMENT_DETAILS_REQUEST,
  DEPARTMENT_DETAILS_SUCCESS,
  DEPARTMENT_DETAILS_RESET,
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_UPDATE_FAIL,
  DEPARTMENT_UPDATE_REQUEST,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_UPDATE_RESET,
  DEPARTMENT_LIST_RESET,
} from '../constants/departmentConstants'

export const createDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_CREATE_REQUEST:
      return { loading: true }
    case DEPARTMENT_CREATE_SUCCESS:
      return { loading: false, department: action.payload }
    case DEPARTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case DEPARTMENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const listDepartmentsReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case DEPARTMENT_LIST_REQUEST:
      return { loading: true }
    case DEPARTMENT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        departments: action.payload,
      }
    case DEPARTMENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    case DEPARTMENT_LIST_RESET:
      return { departments: [] }
    default:
      return state
  }
}

export const getDepartmentDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_DETAILS_REQUEST:
      return { loading: true }
    case DEPARTMENT_DETAILS_SUCCESS:
      return { loading: false, success: true, department: action.payload }
    case DEPARTMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case DEPARTMENT_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const updateDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_UPDATE_REQUEST:
      return { loading: true }
    case DEPARTMENT_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case DEPARTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case DEPARTMENT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const deleteDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_DELETE_REQUEST:
      return { loading: true }
    case DEPARTMENT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case DEPARTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
