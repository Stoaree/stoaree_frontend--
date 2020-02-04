import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { storyReducer } from "./storyReducer";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

const rootReducer = combineReducers({
  form: formReducer,
  storyReducer,
  userReducer,
  searchReducer
});

export const store = createStore(rootReducer);