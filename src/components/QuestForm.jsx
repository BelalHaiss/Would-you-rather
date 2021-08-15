import React from 'react';
const QuestForm = ({ onSubmit, onClick, quest }) => {
  return (
    <form onSubmit={onSubmit}>
      <h5>Would You Rather</h5>

      <p className=''>
        <label>
          <input
            onClick={() => onClick(quest.id, 'optionOne')}
            type='radio'
            name='hireme'
          />
          <span className=''>{quest.optionOne.text} ?</span>
        </label>
      </p>
      <p className=''>
        <label>
          <input
            onClick={() => onClick(quest.id, 'optionTwo')}
            type='radio'
            name='hireme'
          />
          <span className=''>{quest.optionTwo.text} ?</span>
        </label>
      </p>
      <button className='btn btn-success' onClick={onSubmit}>
        Submit
      </button>
    </form>
  );
};

export default QuestForm;
