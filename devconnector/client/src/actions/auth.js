import api from '../api'
import { setAlert } from '../actions/alert'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from './types'
import setAuthToken from '../utils/setAuthToken'

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
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(
        error.msg,
        'danger'
      )))
    }

    dispatch({
      type: REGISTER_FAIL
    })
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
    dispatch({
      type: AUTH_ERROR
    })
  }
}