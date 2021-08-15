import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner.jsx';

const PrivateRoute = (props) => {
  const {
    path,
    auth: { loading, isAuth },
    component: Component,
    ...rests
  } = props;

  if (loading) {
    return <Spinner />;
  }
  return (
    <Route
      {...rests}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: path }} />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);
