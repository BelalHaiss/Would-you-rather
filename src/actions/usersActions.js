import * as types from './types';
import { _getUsers } from '../_DATA';
import { handleAlert } from './alertsAction';

export const logoutBTN = () => (dispatch) => {
  try {
    dispatch({ type: types.logout });
    dispatch(handleAlert('Good Bye', 'green accent-3'));
  } catch (error) {
    dispatch(handleAlert(error.message, 'red'));
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: types.setLoading });
    const users = await _getUsers();
    dispatch({ type: types.users, payload: users });
  } catch (error) {
    dispatch(handleAlert('problem with fetching users', 'red'));
  }
};

export const singIn = (id) => (dispatch, getState) => {
  try {
    const allUsers = getState().auth.users;
    const user = allUsers.filter((user) => id === user.id);

    dispatch({ type: types.user, payload: { ...user } });
    dispatch(handleAlert(`Welcome ${id} `, 'green accent-3'));
  } catch (error) {
    dispatch(handleAlert('problem with signin in', 'red'));
  }
};
