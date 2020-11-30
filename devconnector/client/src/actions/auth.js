import api from '../api'
import { setAlert } from '../actions/alert'
import setAuthToken from '../utils/setAuthToken'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types'

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const response = await api.post('/user', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    })

    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(
        error.msg,
        'danger'
      )))
    }

    dispatch({ type: REGISTER_FAIL })
  }
}

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const response = await api.get('/user/auth')

    dispatch({
      type: USER_LOADED,
      payload: response.data
    })
  } catch (error) {
    dispatch({ type: AUTH_ERROR })
  }
}

// Login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const response = await api.post('/user/auth', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    })

    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(
        error.msg,
        'danger'
      )))
    }

    dispatch({ type: LOGIN_FAIL })
  }
}