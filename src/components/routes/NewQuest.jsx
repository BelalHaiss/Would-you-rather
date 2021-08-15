import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { saveTheQuestion } from '../../actions/quesActions';
import { getAllUsers } from '../../actions/usersActions';

const NewQuest = (props) => {
  const { user, saveTheQuestion, getAllUsers } = props;
  useEffect(() => {
    document.title = 'New Question';
  }, []);

  const [options, setOptions] = useState({
    optionOne: '',
    optionTwo: ''
  });
  const onChange = (e) =>
    setOptions({ ...options, [e.target.name]: e.target.value });
  const onClick = async (e) => {
    e.preventDefault();
    if (user?.id && options?.optionOne && options?.optionTwo) {
      const question = {
        optionOneText: options.optionOne,
        optionTwoText: options.optionTwo,
        author: user.id
      };
      getAllUsers();
      const res = await saveTheQuestion(question);
      props.history.push(`/question/${res}`);
    }
  };
  return (
    <div className='Box' style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className='Box-header'>
        <h2 className='Box-title h2-mktg'>Create New Question</h2>
      </div>
      <p className='ml-2 h4-mktg my-3 text-center'>Would You Rather ?</p>
      <div className='Box-body'>
        <form>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='text'
                onChange={onChange}
                name='optionOne'
                required
                type='text'
                className='validate'
              />
              <label htmlFor='text'>Enter option one text</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='text2'
                name='optionTwo'
                onChange={onChange}
                required
                type='text'
                className='validate'
              />
              <label htmlFor='text2'>Enter option two text</label>
            </div>
          </div>
          <button
            onClick={onClick}
            className='btn btn-sucess '
            style={{ width: '100%' }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user[0]
});
export default connect(mapStateToProps, { getAllUsers, saveTheQuestion })(
  NewQuest
);
