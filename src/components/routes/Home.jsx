import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import sortBy from 'sort-by';
import Spinner from '../layout/Spinner';
import QuestionList from '../QuestionList';

const Home = ({ user, quests: { allQuest, questLoading } }) => {
  useEffect(() => {
    document.title = 'All Questions';
  }, []);

  const [active, setActive] = useState(1);
  console.log(allQuest);
  const answerState = () => {
    if (allQuest !== null) {
      const answerd = allQuest.filter((quest) => {
        return (
          quest.optionTwo.votes.includes(user[0].id) ||
          quest.optionOne.votes.includes(user[0].id)
        );
      });
      const unAnswerd = allQuest.filter((quest) => {
        return (
          //   quest.optionOne.votes.indexOf(user[0].id) === -1 &&
          //   quest.optionTwo.votes.indexOf(user[0].id) === -1
          !quest.optionTwo.votes.includes(user[0].id) &&
          !quest.optionOne.votes.includes(user[0].id)
        );
      });
      return { unAnswerd, answerd };
    }
  };

  if (questLoading) {
    return <Spinner />;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }} className='tabnav'>
      <nav
        className='tabnav-tabs border-bottom'
        style={{ backgroundColor: 'white', height: 'auto', lineHeight: '1.6' }}
      >
        <a
          className={`tabnav-tab ${active === 1 && ' is-selected'} `}
          style={{
            width: '50%'
          }}
          href='#url'
          aria-current={active === 1 && 'page'}
          onClick={() => setActive(1)}
        >
          <span>Unanswerd Questions</span>
          <span className='Counter'>{answerState().unAnswerd.length}</span>
        </a>
        <a
          className={`tabnav-tab ${active === 2 && ' is-selected'} `}
          style={{ width: '50%' }}
          href='#url'
          aria-current={active === 2 && 'page'}
          onClick={() => setActive(2)}
        >
          <span>ِAnswerd Question</span>
          <span className='Counter'>{answerState().answerd.length}</span>
        </a>
      </nav>
      <div className='box  '>
        {!questLoading &&
          allQuest !== null &&
          active === 1 &&
          answerState().unAnswerd.length === 0 && (
            <div className='flash mt-3 flash-success '>
              You have Answerd All Question
            </div>
          )}
        {!questLoading && allQuest !== null && active === 1
          ? answerState()
              .unAnswerd.map((quest) => ({
                quest: quest,
                date: quest.timestamp
              }))
              .sort(sortBy('-date'))
              .map((quest) => (
                <QuestionList key={quest.quest.id} quest={quest.quest} />
              ))
          : answerState()
              .answerd.map((quest) => ({
                quest: quest,
                date: quest.timestamp
              }))
              .sort(sortBy('-date'))
              .map((quest) => (
                <QuestionList
                  key={quest.quest.id}
                  result={true}
                  quest={quest.quest}
                />
              ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  quests: state.quests,
  user: state.auth.user
});

export default connect(mapStateToProps)(Home);
