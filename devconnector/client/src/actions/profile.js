import api from '../api'
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types'

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
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await api.post('/profile', formData, config)

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

// Add experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const response = await api.patch('/profile/update/experience', formData)

    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    })

    dispatch(setAlert('Experience Added.', 'success'))
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

// Add education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const response = await api.patch('/profile/update/education', formData)

    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    })

    dispatch(setAlert('Education Added.', 'success'))
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