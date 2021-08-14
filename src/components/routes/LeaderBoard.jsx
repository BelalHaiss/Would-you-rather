import React from 'react';
import { connect } from 'react-redux';
import sortBy from 'sort-by';

const LeaderBoard = ({ users, loading }) => {
  return (
    <div>
      {!loading &&
        users
          .map((user) => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answeredQuestions: Object.keys(user.answers).length,
            createdQuestions: user.questions.length,
            score: Object.keys(user.answers).length + user.questions.length
          }))
          .sort(sortBy('-score'))
          .map((user, i) => (
            <div key={user.id}>
              <div
                className='border '
                style={{
                  position: 'relative',
                  maxWidth: '600px ',
                  margin: '20px auto'
                }}
              >
                {i === 0 && (
                  <img
                    style={{ position: 'absolute', top: '3px', left: '0' }}
                    width='60'
                    alt='cup1'
                    src='data:image/png;base64,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'
                  />
                )}
                <h3 className='Box-title ml-6 text-center'>
                  <b style={{ fontSize: '1.2rem' }}>{user.name}</b>
                </h3>

                <div
                  className='Box-body flex-sm-row   border-top'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div className='text-center '>
                    <img
                      width='150px'
                      src={user.avatarURL}
                      alt=''
                      className='CircleBadge-icon'
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      // width: '  60%',
                      alignItems: 'center'
                    }}
                  >
                    <p className='h4-mktg'>
                      Answerd Questions : <b>{user.answeredQuestions}</b>
                    </p>

                    <p className='border-top h4-mktg'>
                      Created Questions : <b>{user.createdQuestions}</b>
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      outline: '1px solid lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div
                      style={{ backgroundColor: 'lightgrey', width: '100px' }}
                    >
                      <h3 className='h4-mktg text-center Box-title'>Score</h3>
                    </div>

                    <p className='h1-mktg '>{user.score}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  users: state.auth.users,
  loading: state.auth.loading
});
export default connect(mapStateToProps)(LeaderBoard);
