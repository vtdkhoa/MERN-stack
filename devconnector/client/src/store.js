import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import setAuthToken from './utils/setAuthToken'

const initialState = {}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

/**
 * Note:
 * - Set up a store subscription listener to store the users token in local storage
 * - Initialize current state from redux store for subscription comparison preventing undefined error
 */
let currentState = store.getState()

// Todo: Set up a store subscription
store.subscribe(() => {
  // Keep track of the previous and current state to compare changes
  let prevState = currentState
  currentState = store.getState()

  // If the token changes set the value in local storage and axios headers
  if (prevState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token
    setAuthToken(token)
  }
})

export default store