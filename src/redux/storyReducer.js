import { getTopLevelQuestions, getQuestionFromId } from "../pages/InterviewPage/functions"

const initialState = {
  allQuestions: [],
  currentQuestion: null,
  currentQuestionSubset: []
};

function setAllQuestions(questions) {
  return { type: "SET_ALL_QUESTIONS", questions }
}

function answerYes(subQuestions) {
  return { type: "ANSWER_YES", subQuestions };
}

export default function storyReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case "SET_ALL_QUESTIONS":
      newState.allQuestions = action.questions;
      newState.currentQuestion = action.questions[0];
      newState.currentQuestionSubset = getTopLevelQuestions(action.questions);
      break;
    case "ANSWER_YES":
      newState.currentQuestionSubset = action.subQuestions;
      newState.currentQuestion = getQuestionFromId(state.allQuestions, action.subQuestions[0]);
      break;
    default:
      break;
  }
  console.log(newState);
  return newState;
}

export { setAllQuestions, answerYes };