export const LOAD_APP = "LOAD_APP";

export function loadApp(questions) {
  return dispatch => {
    dispatch({ type: LOAD_APP, questions });
  };
}
