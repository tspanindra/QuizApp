import { LOAD_APP } from "./actions";
import { combineReducers } from "redux";

const intialState = {
  questions: []
};

const QuizApp = (state = intialState, action) => {
  switch (action.type) {
    case LOAD_APP: {
      return { ...state, questions: action.questions };
    }
    default: {
      return state;
    }
  }
};

const appReducer = combineReducers({
  QuizApp
});

export default appReducer;
