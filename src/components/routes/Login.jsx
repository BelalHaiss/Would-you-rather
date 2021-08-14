import React from 'react';
import UserSelect from '../UserSelect.jsx';
const Login = (props) => {
  return (
    <div className='container'>
      <div className='card blue-grey darken-1'>
        <div className='card-content whlzite-text'>
          <span className='card-title center'>
            Welcome To Would You Rather Game
          </span>
        </div>
        <div
          className='card-action'
          style={{ padding: '50px', paddingTop: '10px' }}
        >
          <h4 className='teal-text text-accent-3 center'>Sing In</h4>
          <UserSelect props={props} />
        </div>
      </div>
    </div>
  );
};

export default Login;
