import React from 'react';
const QuestForm = ({ onSubmit, onClick, quest }) => {
  return (
    <form onSubmit={onSubmit}>
      <h5>Would You Rather</h5>

      <div className='form-checkbox'>
        <label>
          <input
            onClick={() => onClick(quest.id, 'optionOne')}
            type='radio'
            name='hireme'
            style={{ opacity: '100%' }}
          />
          {quest.optionOne.text} ?
        </label>
      </div>
      <div className='form-checkbox'>
        <label>
          <input
            onClick={() => onClick(quest.id, 'optionTwo')}
            type='radio'
            name='hireme'
            style={{ opacity: '100%' }}
          />
          {quest.optionTwo.text} ?
        </label>
      </div>
      <button className='btn btn-success' onClick={onSubmit}>
        Submit
      </button>
    </form>
  );
};

export default QuestForm;
