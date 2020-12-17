import api from '../api'
import { setAlert } from './alert'
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_REPOS,
  NO_REPOS,
  DELETE_ACCOUNT
} from './types'

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

// Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const response = await api.delete(`/profile/delete/experience/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    })

    dispatch(setAlert('Experience Deleted.', 'success'))
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

// Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const response = await api.delete(`/profile/delete/education/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    })

    dispatch(setAlert('Education Deleted.', 'success'))
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

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })

  try {
    const response = await api.get('/profile')

    dispatch({
      type: GET_PROFILES,
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

// Get profile by user id
export const getProfileById = userId => async dispatch => {
  try {
    const response = await api.get(`/profile/user/${userId}`)

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

// Get repos from GitHub profile
export const getGitHubRepos = username => async dispatch => {
  try {
    const response = await api.get(`/profile/github/${username}`)

    dispatch({
      type: GET_REPOS,
      payload: response.data
    })
  } catch (error) {
    dispatch({ type: NO_REPOS })
  }
}

// Delete account
export const deleteAccount = () => async dispatch => {
  try {
    await api.delete('/user')

    dispatch({ type: CLEAR_PROFILE })
    dispatch({ type: DELETE_ACCOUNT })

    dispatch(setAlert('Your account has been permanently deleted.', 'info'))
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