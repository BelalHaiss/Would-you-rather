import {
  getQuestions,
  setQuestLoading,
  removeQuestLoading,
  saveQuestion
} from './types';
import { handleAlert } from './alertsAction';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';

export const getQuest = () => async (dispatch) => {
  try {
    dispatch({ type: setQuestLoading });

    const res = await _getQuestions();
    dispatch({ type: getQuestions, payload: res });
    dispatch({ type: removeQuestLoading });
  } catch (error) {
    dispatch(handleAlert('problem with fetching questions', 'red'));
    dispatch({ type: removeQuestLoading });
  }
};

export const saveTheAnswer = (obj) => async (dispatch) => {
  try {
    dispatch({ type: setQuestLoading });
    await _saveQuestionAnswer(obj);

    dispatch({ type: removeQuestLoading });
    dispatch(handleAlert('Answer Submited Successflly', 'green accent-3'));
  } catch (error) {
    dispatch(handleAlert('problem with submiting the answer', 'red'));
    dispatch({ type: removeQuestLoading });
  }
};
export const saveTheQuestion = (question) => async (dispatch) => {
  try {
    dispatch({ type: setQuestLoading });
    const res = await _saveQuestion(question);

    dispatch({ type: saveQuestion, payload: res });
    dispatch({ type: removeQuestLoading });
    dispatch(handleAlert('Question Submited Successflly', 'green accent-3'));
    return res.id;
  } catch (error) {
    dispatch(handleAlert('problem with submiting the answer', 'red'));
    dispatch({ type: removeQuestLoading });
  }
};
