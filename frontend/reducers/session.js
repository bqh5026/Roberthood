
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session";

const _nullSession = {
  currentUser: null,
};

export default (state = _nullSession, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.user;
      return Object.assign({}, { currentUser });
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
};

// import {
//   RECEIVE_CURRENT_USER,
//   LOGOUT_CURRENT_USER,
// } from "../actions/session";

// const _nullUser = Object.freeze({
//   id: null,
// });

// const sessionReducer = (state = _nullUser, action) => {
//   Object.freeze(state);
//   switch (action.type) {
//     case RECEIVE_CURRENT_USER:
//       return { id: action.currentUser.id };
//     case LOGOUT_CURRENT_USER:
//       return _nullUser;
//     default:
//       return state;
//   }
// };

// export default sessionReducer;
