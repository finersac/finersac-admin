/*
  User Reducer, is used to manage user data and persist them.
 */
import {
  SET_USER,
  REMOVE_USER,
  REMOVE_ALL,
} from '../../utils/constants/reducers'

/**
 * @return {boolean | Object}
 */
function userReducer(state = false, action: any) {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload }
    case REMOVE_USER:
      return false
    case REMOVE_ALL:
      return false
    default:
      return state
  }
}

export default userReducer
