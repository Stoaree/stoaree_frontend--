const initialState = {
  allQuestions: [],
  currentQuestion: null,
  currentQuestionSubset: []
};

function getTopLevelQuestions(questions) {
  questions = questions.filter(question => question.isTopLevel);
  return questions.map(question => question._id);
}

function getQuestionFromId(questions, id) {
  return questions.find(question => question._id === id);
}

function setAllQuestions(questions) {
  return { type: "SET_ALL_QUESTIONS", questions }
}

function enterSubQuestions(subQuestions) {
  return { type: "ENTER_SUBQUESTIONS", subQuestions };
}

function nextQuestion(nextQuestion, nextQuestionSubset) {
  return { type: "NEXT_QUESTION", nextQuestion, nextQuestionSubset };
}

export function storyReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case "SET_ALL_QUESTIONS":
      newState.allQuestions = action.questions;
      newState.currentQuestion = action.questions[0];
      newState.currentQuestionSubset = getTopLevelQuestions(action.questions);
      break;
    case "ENTER_SUBQUESTIONS":
      newState.currentQuestionSubset = action.subQuestions;
      newState.currentQuestion = getQuestionFromId(state.allQuestions, action.subQuestions[0]);
      break;
    case "NEXT_QUESTION":
      newState.currentQuestion = action.nextQuestion;
      newState.currentQuestionSubset = action.nextQuestionSubset;
      break;
    default:
      break;
  }
  return newState;
}

export { setAllQuestions, enterSubQuestions, nextQuestion };