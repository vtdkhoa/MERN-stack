import api from '../api'
import { setAlert } from './alert'
import {
  CREATE_POST,
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  ADD_LIKES,
  ADD_COMMENT
} from './types'

// Create a post
export const createPost = formData => async dispatch => {
  try {
    const response = await api.post('/post', formData)

    dispatch({
      type: CREATE_POST,
      payload: response.data
    })

    dispatch(setAlert('Post Created.', 'success'))
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

// Add comment
export const addComment = (id, formData) => async dispatch => {
  try {
    const response = await api.patch(`post/comment/${id}`, formData)

    dispatch({
      type: ADD_COMMENT,
      payload: response.data
    })

    dispatch(setAlert('Comment Added.', 'success'))
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