import api from '../api'
import { GET_POSTS, POST_ERROR, GET_POST } from './types'

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

// Get a single post
export const getPost = id => async dispatch => {
  try {
    const response = await api.get(`/post/${id}`)

    dispatch({
      type: GET_POST,
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