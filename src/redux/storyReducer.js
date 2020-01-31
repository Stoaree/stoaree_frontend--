const initialState = {
  currentStory: "",
  allQuestions: [],
  currentQuestion: "",
  currentQuestionSubset: [],
  uploadComplete: false
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

function setCurrentStory(storyId) {
  return { type: "SET_CURRENT_STORY", storyId };
}

function confirmUploadComplete() {
  return { type: "SET_UPLOAD_STATUS", uploadStatus: true };
}

function resetUploadStatus() {
  return { type: "SET_UPLOAD_STATUS", uploadStatus: false };
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
    case "SET_CURRENT_STORY":
      newState.currentStory = action.storyId;
      break;
    case "SET_UPLOAD_STATUS":
      newState.uploadComplete = action.uploadStatus;
      break;
    default:
      break;
  }
  return newState;
}

export { setAllQuestions, enterSubQuestions, nextQuestion, setCurrentStory, confirmUploadComplete, resetUploadStatus };