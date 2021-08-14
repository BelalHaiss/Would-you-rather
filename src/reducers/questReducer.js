import {
  logout,
  getQuestions,
  setQuestLoading,
  removeQuestLoading,
  saveQuestion
} from '../actions/types';
const initialState = {
  allQuest: null,
  questLoading: true
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case getQuestions:
      return { ...state, allQuest: payload };
    case saveQuestion:
      return { ...state, allQuest: [...state.allQuest, payload] };
    case setQuestLoading:
      return { ...state, questLoading: true };
    case removeQuestLoading:
      return { ...state, questLoading: false };
    case logout:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
