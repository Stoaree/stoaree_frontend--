import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { storyReducer } from "./storyReducer"

const rootReducer = combineReducers({
  form: formReducer,
  storyReducer
});

export const store = createStore(rootReducer);