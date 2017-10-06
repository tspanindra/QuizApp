import React from "react";
import Main from "./src/main";
import Quiz from "./src/Quiz";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import appReducer from "./state/reducer";
import thunk from "redux-thunk";
import "./ReactotronConfig";
import Reactotron from "reactotron-react-native";

const BasicApp = StackNavigator({
  Main: { screen: Main },
  Quiz: { screen: Quiz }
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
