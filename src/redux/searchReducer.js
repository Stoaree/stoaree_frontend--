const initialState = {
  searchQuery: ""
}

function setSearchQuery(query) {
  return { type: "SET_SEARCH_QUERY", query };
}

export function searchReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case "SET_SEARCH_QUERY":
      newState.searchQuery = action.query;
      break;
    default:
      break;
  }

  return newState;
}

export { setSearchQuery };