import api from '../api'
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR } from './types'

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const response = await api.get('/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}

// Create or Update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const response = await api.post('/profile', formData)

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })

    dispatch(setAlert(edit ? 'Profile Updated.' : 'Profile Created.', 'success'))
    history.push('/dashboard')
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => {
        return dispatch(setAlert(error.msg, 'danger'))
      })
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}