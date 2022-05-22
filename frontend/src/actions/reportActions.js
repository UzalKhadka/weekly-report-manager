import axios from 'axios'
import {
  REPORT_ADMIN_UPDATE_FAIL,
  REPORT_ADMIN_UPDATE_REQUEST,
  REPORT_ADMIN_UPDATE_SUCCESS,
  REPORT_CREATE_FAIL,
  REPORT_CREATE_REQUEST,
  REPORT_CREATE_SUCCESS,
  REPORT_DELETE_FAIL,
  REPORT_DELETE_REQUEST,
  REPORT_DELETE_SUCCESS,
  REPORT_DETAILS_FAIL,
  REPORT_DETAILS_REQUEST,
  REPORT_DETAILS_SUCCESS,
  REPORT_LIST_BY_EMPLOYEE_FAIL,
  REPORT_LIST_BY_EMPLOYEE_REQUEST,
  REPORT_LIST_BY_EMPLOYEE_SUCCESS,
  REPORT_UPDATE_FAIL,
  REPORT_UPDATE_REQUEST,
  REPORT_UPDATE_SUCCESS,
} from '../constants/reportConstants'

const createReport =
  (
    start_date,
    end_date,
    task,
    description,
    satisfactory_score,
    hours_worked,
    remarks
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: REPORT_CREATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        '/api/reports/',
        {
          start_date,
          end_date,
          user_id: userInfo._id,
          task,
          description,
          hours_worked,
          satisfactory_score,
          remarks,
        },
        config
      )

      dispatch({
        type: REPORT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: REPORT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

const listReportsByEmployee = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPORT_LIST_BY_EMPLOYEE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/reports/user/${id}`, config)

    dispatch({
      type: REPORT_LIST_BY_EMPLOYEE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REPORT_LIST_BY_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getReportDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPORT_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/reports/${id}`, config)

    dispatch({
      type: REPORT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REPORT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const updateReport =
  (
    id,
    start_date,
    end_date,
    task,
    description,
    satisfactory_score,
    hours_worked,
    remarks
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: REPORT_UPDATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/reports/${id}`,
        {
          start_date,
          end_date,
          task,
          description,
          satisfactory_score,
          hours_worked,
          remarks,
        },
        config
      )

      dispatch({
        type: REPORT_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: REPORT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

// update report by admin
const updateReportByAdmin = (id, is_approved) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPORT_ADMIN_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/reports/${id}`,
      {
        is_received: true,
        is_approved,
      },
      config
    )

    dispatch({
      type: REPORT_ADMIN_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REPORT_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const deleteReport = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPORT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/reports/${id}`, config)

    dispatch({
      type: REPORT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: REPORT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export {
  createReport,
  getReportDetails,
  listReportsByEmployee,
  updateReport,
  updateReportByAdmin,
  deleteReport,
}
