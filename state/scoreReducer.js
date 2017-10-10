import { SAVE_SCORE } from "./actions";

const intialState = [];

const Scores = (state = intialState, action) => {
  switch (action.type) {
    case SAVE_SCORE: {
      const newState = state.concat(action.score).reverse();
      if (newState.length > 5) {
        newState = newState.splice(0, 5);
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default Scores;
