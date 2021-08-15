import React, { useEffect, Fragment } from 'react';
import { getAllUsers, singIn } from '../actions/usersActions';
import { connect } from 'react-redux';

const UserSelect = (props) => {
  const {
    singIn,
    getAllUsers,
    auth: { loading, users }
  } = props;
  useEffect(() => {
    getAllUsers();
  }, []);
  const onClick = (e) => {
    singIn(e.target.innerText);
    const redirectedFrom = props.props.location.state;
    const filterPath = redirectedFrom.replace(/\/(\w+)\/(.*)/, '/$1/');

    if (redirectedFrom && filterPath === '/question/') {
      return props.props.history.push('/');
    }

    redirectedFrom
      ? props.props.history.push(filterPath)
      : props.props.history.push('/');
  };

  return (
    <Fragment>
      <details className='details-reset center details-overlay'>
        <summary
          className='btn'
          style={{ display: 'inline-block' }}
          aria-haspopup='true'
        >
          Choose Your User name
        </summary>
        <div
          className='SelectMenu'
          style={{ width: '100%', marginTop: '10px' }}
        >
          <div
            className='SelectMenu-modal'
            style={{ margin: '0 auto', width: '400px' }}
          >
            <header className='SelectMenu-header'>
              <div className='SelectMenu-list'>
                {users !== null &&
                  users.map((user) => (
                    <button
                      key={user.id}
                      className='SelectMenu-item'
                      style={{ fontSize: '20px' }}
                      value={user}
                      onClick={onClick}
                    >
                      <img
                        className='avatar avatar-small mr-2'
                        src={user.avatarURL}
                        alt='hubot'
                        height='50'
                        width='50'
                      />
                      {user.id}
                    </button>
                  ))}
              </div>
            </header>
          </div>
        </div>
      </details>

      <div className='d-sm-none'></div>
      <div className='d-none d-sm-block'></div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getAllUsers, singIn })(UserSelect);
