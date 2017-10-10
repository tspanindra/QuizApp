export const LOAD_APP = "LOAD_APP";
export const SAVE_SCORE = "SAVE_SCORE";

export function loadApp(questions) {
  return dispatch => {
    dispatch({ type: LOAD_APP, questions });
  };
}

export function saveScore(score) {
  return dispatch => {
    dispatch({ type: SAVE_SCORE, score });
  };
}
