import {
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  ADD_LIKES,
  POST_ERROR
} from '../actions/types'

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          action.payload
        ],
        loading: false
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case ADD_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.id ? {
            ...post,
            likes: action.payload.likes
          } : post
        ),
        loading: false
      }
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}