import { SET_FAVORITE } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_FAVORITE:
      return action.payload
    default:
      return state
  }
}
