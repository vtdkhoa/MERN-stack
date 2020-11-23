import api from '../api'
import { setAlert } from '../actions/alert'
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types'

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const response = await api.post('/api/user', body, config)

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