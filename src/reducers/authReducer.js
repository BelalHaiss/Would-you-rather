import {
  removeLoading,
  user,
  setLoading,
  users,
  logout
} from '../actions/types';

const initialState = {
  isAuth: false,
  user: null,
  loading: false,
  users: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case users:
      return { ...state, users: payload, loading: false };
    case setLoading:
      return { ...state, loading: true };
    case user:
      return { ...state, user: payload, isAuth: true };
    case removeLoading:
      return { ...state, loading: false };
    case logout:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
