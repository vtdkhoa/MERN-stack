import api from '../api'
import { setAlert } from './alert'
import {
  CREATE_POST,
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  GET_MY_POSTS,
  ADD_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  DELETE_POST
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

// Get all user's own posts
export const getMyPosts = () => async dispatch => {
  try {
    const response = await api.get('/post')

    dispatch({
      type: GET_MY_POSTS,
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
    const response = await api.patch(`/post/like/${id}`)

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
    const response = await api.patch(`/post/comment/${id}`, formData)

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

// Remove comment
export const removeComment = (postId, commentId) => async dispatch => {
  try {
    await api.delete(`/post/comment/${postId}/${commentId}`)

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })

    dispatch(setAlert('Comment Removed.', 'success'))
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

// Delete a post
export const deletePost = id => async dispatch => {
  try {
    await api.delete(`/post/${id}`)

    dispatch({
      type: DELETE_POST,
      payload: id
    })

    dispatch(setAlert('Post Deleted.', 'success'))
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