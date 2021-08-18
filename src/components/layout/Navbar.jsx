import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutBTN } from '../../actions/usersActions';
import Spinner from './Spinner';
import { Fragment } from 'react';

const Navbar = ({ logoutBTN, auth: { isAuth, user, loading } }) => {
  const [show, setShow] = useState(false);
  const signInBTN = (e) => {
    function simulateMouseClick(element) {
      element.dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1
        })
      );
    }
    const element = document.querySelector('#summaryLoginBtn');
    simulateMouseClick(element);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      {!loading && (
        <nav style={{ marginBottom: '30px' }} className='teal lighten-2'>
          <div className=' nav-container  '>
            <div className='nav-toggole'>
              <h5>Would You Rather</h5>

              <i
                id='nav-toggole-icon'
                onClick={() => setShow(!show)}
                className='large material-icons'
              >
                menu
              </i>
            </div>
            <ul id='nav-div' className={`nav-div ${show && 'show'} `}>
              <li className='first-li'>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/newquest'>New Question</Link>
              </li>
              <li>
                <Link to='/leaderBoard'>Leader board</Link>
              </li>
            </ul>
            <ul
              id='nav-div'
              style={{ height: '100%' }}
              className={`nav-div nav-div-right ${show && 'show'}   `}
            >
              {!loading && isAuth && user !== null ? (
                <li
                  style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.3rem'
                  }}
                >
                  Welcome <b>{user && user[0] && user[0].id}</b>
                  <img
                    src={user && user[0] && user[0].avatarURL}
                    alt=''
                    height='30'
                    width='30'
                    className='circle responsive-img'
                  />
                  <Link
                    to='#'
                    id='logout-icon'
                    className='d-flex  '
                    // style={{ height: '99.9%' }}
                    onClick={logoutBTN}
                  >
                    <img
                      // className='waves-red'
                      src='/logout.svg'
                      width='30px'
                      height='20px'
                      alt=''
                    />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link onClick={signInBTN} to='/login'>
                    {' '}
                    Login{' '}
                  </Link>
                </li>
              )}
              <li
                style={{
                  display: 'inline-block',
                  width: '100%',
                  textAlign: 'center'
                }}
                className='brand-hide'
              >
                Would You Rather
              </li>
            </ul>
          </div>
        </nav>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutBTN })(Navbar);
