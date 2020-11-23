import { v4 } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './types'

export const setAlert = (message, alertType) => dispatch => {
  const id = v4()

  dispatch({
    type: SET_ALERT,
    payload: { id, message, alertType }
  })

  // Remove alert after 3 seconds
  setTimeout(() => dispatch({
    type: REMOVE_ALERT,
    payload: id
  }), 3000)
}