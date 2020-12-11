import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from '../actions/types'

const initialState = {
  currentProfile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        currentProfile: action.payload,
        loading: false,
        error: null
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        currentProfile: null,
        repos: [],
        loading: false
      }
    default:
      return state
  }
}