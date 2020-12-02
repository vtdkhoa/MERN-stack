import { GET_PROFILE, PROFILE_ERROR } from '../actions/types'

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
      return {
        ...state,
        currentProfile: action.payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}