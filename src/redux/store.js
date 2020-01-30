import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { storyReducer } from "./storyReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  form: formReducer,
  storyReducer,
  userReducer
});

export const store = createStore(rootReducer);