import Cookies from 'js-cookie';

//JSON.parse is used to convert the stringified user data to an object
export const userReducer = (
  state = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  action
) => {
  //State is the default state at the begining
  // action define what we want to do with the state
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'VERIFY':
      return { ...state, verified: action.payload };

    default:
      return state;
  }
};
