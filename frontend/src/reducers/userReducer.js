export const userReducer = (state = null, action) => {
  //State is the default state at the begining
  // action define what we want to do with the state
  switch (action.type) {
    case 'LOGIN':
      return action.payload;

    default:
      return state;
  }
};
