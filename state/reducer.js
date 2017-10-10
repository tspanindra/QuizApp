import { LOAD_APP } from "./actions";

const intialState = {
  questions: []
};

const Questions = (state = intialState, action) => {
  switch (action.type) {
    case LOAD_APP: {
      return { ...state, questions: action.questions };
    }
    default: {
      return state;
    }
  }
};

export default Questions;
