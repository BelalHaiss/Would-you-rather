import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Question = ({ quest, stateUsers, result }) => {
  const theAvatar = (author) => {
    if (stateUsers !== null) {
      const user = stateUsers.filter((user) => user.id === author);
      return user[0].avatarURL;
    }
  };
  return (
    <div className='border '>
      <h3 className='Box-title ml-6'>
        <b style={{ fontSize: '1.2rem' }}>{quest.author}</b> Asks{' '}
      </h3>

      <div
        className='Box-body flex-sm-row    border-top'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div id='box-img' className=' ml-4 mr-6'>
          <img
            width='250px'
            src={theAvatar(quest.author)}
            alt=''
            className='CircleBadge-icon'
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <h5>Would You Rather</h5>
          <p style={{ fontSize: '1.2rem' }}>{quest.optionOne.text} ?</p>
          <Link
            className='btn  btn-primary '
            style={{ width: '150px', borderRadius: '10px' }}
            type='button'
            to={{ pathname: `/question/${quest.id}${result ? '/result' : ''}` }}
          >
            View Poll
          </Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  stateUsers: state.auth.users
});
export default connect(mapStateToProps)(Question);
