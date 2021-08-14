import { setAlert, deleteAlert, removeLoading } from './types';

let n = 0;

function increment() {
  n++;
  return n;
}
export const handleAlert =
  (msg, type, timeout = 1500) =>
  (dispatch) => {
    const id = increment();
    dispatch({
      type: setAlert,
      payload: { msg, type, id }
    });

    dispatch({ type: removeLoading });
    setTimeout(() => dispatch(deleteTheAlert(id)), timeout);
  };

export const deleteTheAlert = (id) => {
  return {
    type: deleteAlert,
    payload: id
  };
};
