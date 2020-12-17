import api from '../api'
import { GET_POSTS, POST_ERROR } from './types'

// Get all posts
export const getPosts = () => async dispatch => {
  try {
    const response = await api.get('/post/all')

    dispatch({
      type: GET_POSTS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}