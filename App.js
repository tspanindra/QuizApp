import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import * as Progress from "react-native-progress";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showProgressBar: true
    };
  }

  startTrivia = () => {
    console.warn("start the app");
  };

  loadData = async () => {
    try {
      let response = await fetch("http://dev.theappsdr.com/apis/trivia_json/index.php");
      let responseJson = await response.json();
      console.warn(JSON.stringify(responseJson));
    } catch (error) {
      console.error(error);
    }
  };

  componentWillMount() {
    this.loadData();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Welcome to</Text>
          <Text style={styles.headerText}>Trivia App</Text>

          {this.state.showProgressBar && (
            <View style={styles.progressBarContainer}>
              <Progress.Circle size={70} indeterminate={true} />
              <Text style={styles.progressTitle}> Loading Trivia </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.startButton} onPress={this.startTrivia}>
            <Text> Start Trivia </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  headerContainer: {
    flex: 3,
    alignItems: "center"
  },
  progressBarContainer: {
    marginTop: 50,
    alignItems: "center"
  },
  progressTitle: {
    marginTop: 10
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20
  },
  startButton: {
    backgroundColor: "gray",
    padding: 5
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center"
  }
});
