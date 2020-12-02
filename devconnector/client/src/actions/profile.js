import api from '../api'
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