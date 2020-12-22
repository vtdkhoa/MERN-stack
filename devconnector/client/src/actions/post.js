import api from '../api'
import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  ADD_LIKES
} from './types'

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

// Add like
export const addLike = id => async dispatch => {
  try {
    const response = await api.patch(`post/like/${id}`)

    dispatch({
      type: ADD_LIKES,
      payload: { id, likes: response.data }
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