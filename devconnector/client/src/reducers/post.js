import {
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  GET_MY_POSTS,
  ADD_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  DELETE_POST,
  POST_ERROR
} from '../actions/types'

const initialState = {
  posts: [],
  post: null,
  myPosts: [],
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
    case GET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload,
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
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload
        },
        loading: false
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== action.payload
          )
        },
        loading: false
      }
    case DELETE_POST:
      return {
        ...state,
        myPosts: state.myPosts.filter(
          post => post._id !== action.payload
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