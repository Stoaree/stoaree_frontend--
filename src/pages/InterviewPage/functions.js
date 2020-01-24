function getQuestionFromId(questions, id) {
  console.log(id)
  return questions.find(question => question._id === id);
}

function getTopLevelQuestions(questions) {
  questions = questions.filter(question => question.isTopLevel);
  return questions.map(question => question._id);
}

export { getQuestionFromId, getTopLevelQuestions }