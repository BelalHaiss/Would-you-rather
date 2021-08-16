import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getQuest, saveTheAnswer } from '../actions/quesActions';
import { getAllUsers } from '../actions/usersActions';
import Spinner from './layout/Spinner';

import QuestForm from './QuestForm';

const QuestItem = (props) => {
  const id = props.match.params.id;

  const {
    users,
    user,
    getQuest,
    getAllUsers,
    saveTheAnswer,
    quests: { allQuest, questLoading }
  } = props;
  const [quest, setTheQuest] = useState(null);

  useEffect(() => {
    if (!questLoading) {
      if (quest === null) {
        const theQuest = allQuest?.find((quest) => quest.id === id);
        if (!theQuest) {
          return props.history.push(`/404/`);
        }
        setTheQuest(theQuest);
        const isUserAnswerd =
          theQuest.optionOne.votes.includes(user[0].id) ||
          theQuest.optionTwo.votes.includes(user[0].id);
        if (isUserAnswerd) {
          return props.history.push(`/question/${theQuest.id}/result`);
        }
      }
    }
    // eslint-disable-next-line
  }, []);

  const theAvatar = (author) => {
    if (users) {
      const user = users.filter((user) => user.id === author);
      if (user) {
        return user[0].avatarURL;
      }
      return '';
    }
  };

  const [qidAndAnswer, setQidAndAnswer] = useState({});
  const onClick = (qid, answer) => {
    setQidAndAnswer({ qid, answer });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { qid, answer } = qidAndAnswer;
    if (qidAndAnswer) {
      const authedUser = user[0].id;
      const obj = { authedUser, qid, answer };
      saveTheAnswer(obj);
      getQuest();
      getAllUsers();

      props.history.push(`/question/${quest.id}/result`);
    }
  };
  if (questLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      {!questLoading && quest !== null && (
        <div
          className='border '
          style={{ maxWidth: '600px ', margin: '100px auto' }}
        >
          <h3 className='Box-title ml-6'>
            <b style={{ fontSize: '1.2rem' }}>{quest.author}</b>Asks
          </h3>

          <div
            className='Box-body flex-sm-row   border-top'
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div className='text-center ml-4 mr-6'>
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
              <QuestForm onSubmit={onSubmit} onClick={onClick} quest={quest} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  quests: state.quests,
  users: state.auth.users,
  user: state.auth.user
});
export default connect(mapStateToProps, {
  getAllUsers,
  saveTheAnswer,
  getQuest
})(QuestItem);
