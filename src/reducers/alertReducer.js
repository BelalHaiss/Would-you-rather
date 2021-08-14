import { setAlert, deleteAlert } from '../actions/types';

const initialState = [];

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case setAlert:
      return [...state, payload];
    case deleteAlert:
      return state.filter((alert) => alert.id !== payload);

    default:
      return state;
  }
};

export default reducer;
