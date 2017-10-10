import React from "react";
import Main from "./src/main";
import Quiz from "./src/Quiz";
import Stats from "./src/Stats";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Questions from "./state/reducer";
import Scores from "./state/scoreReducer";
import thunk from "redux-thunk";
import "./ReactotronConfig";
import Reactotron from "reactotron-react-native";
import { combineReducers } from "redux";

const BasicApp = StackNavigator({
  Main: { screen: Main },
  Quiz: { screen: Quiz },
  Stats: { screen: Stats }
});

const appReducer = combineReducers({
  Questions,
  Scores
});

let store = Reactotron.createStore(appReducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BasicApp />
      </Provider>
    );
  }
}
