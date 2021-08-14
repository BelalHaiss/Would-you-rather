import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getQuest, saveTheAnswer } from '../actions/quesActions';
import { getAllUsers } from '../actions/usersActions';

import QuestForm from './QuestForm';

const QuestItem = (props) => {
  const id = props.match.params.id;

  const {
    users,
    user,
    getQuest,
    getAllUsers,
    saveTheAnswer,
    quests: { allQuest }
  } = props;

  const quest = allQuest.find((quest) => quest.id === id);
  useEffect(() => {
    const isUserAnswerd =
      quest.optionOne.votes.includes(user[0].id) ||
      quest.optionTwo.votes.includes(user[0].id);
    if (isUserAnswerd) {
      return props.history.push(`/question/${quest.id}/result`);
    }
    // eslint-disable-next-line
  }, []);

  const theAvatar = (author) => {
    const user = users.filter((user) => user.id === author);
    return user[0].avatarURL;
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
  return (
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
