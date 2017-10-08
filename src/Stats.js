//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import * as Progress from "react-native-progress";

// create a component
class Stats extends Component {
  render() {
    const { goBack, state, navigate } = this.props.navigation;
    const progress = state.params.numberOfSelectedAns / state.params.noOfQuestions;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Trivia Stats</Text>

        <View style={styles.progressContainer}>
          <Text>Correct Answers</Text>
          <View style={styles.progress}>
            <Text>{Math.round(progress * 100)}% </Text>
            <Progress.Bar progress={progress} width={200} height={20} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={() => navigate("Main")}>
            <Text style={styles.buttonText}> Quit </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => navigate("Quiz")}>
            <Text style={styles.buttonText}> Try Again </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  header: {
    alignSelf: "center",
    fontSize: 15,
    paddingTop: 20,
    fontWeight: "bold"
  },
  progressContainer: {
    marginTop: 20
  },
  progress: {
    flexDirection: "row",
    marginTop: 15
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    padding: 5
  },
  buttonText: {
    padding: 5,
    backgroundColor: "gray"
  }
});

//make this component available to the app
export default Stats;
