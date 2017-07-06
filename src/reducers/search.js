import {
  SET_SEARCH_TEXT,
  SET_SEARCH_RESULTS,
  CLEAR_RESULTS
} from '../constants'
import { merge } from 'ramda'

export default (state = { searchText: '', searchResults: [] }, action) => {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return merge(state, { searchText: action.payload })
    case SET_SEARCH_RESULTS:
      return merge(state, { searchResults: action.payload })
    case CLEAR_RESULTS:
      return merge(state, { searchText: '', searchResults: [] })
    default:
      return state
  }
}
