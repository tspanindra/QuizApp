//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";

export const mapStateToProps = (state: Object) => {
  return {
    questions: state.QuizApp
  };
};

// create a component
class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      showProgressBar: true
    };
  }
  static navigationOptions = {
    title: "Quiz",
    headerStyle: { paddingTop: 20 }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.borderView}>
          <Text style={styles.textStyle}>Q1</Text>
          <Text style={styles.textStyle}>Time remaining: </Text>
        </View>

        {this.state.showProgressBar && (
          <View style={styles.progressBarContainer}>
            <Progress.Circle size={40} indeterminate={true} />
          </View>
        )}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  borderView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  },
  textStyle: {
    padding: 5,
    backgroundColor: "#add8e6"
  },
  progressBarContainer: {
    marginTop: 10,
    alignItems: "center"
  }
});

export default connect(mapStateToProps, null)(Quiz);
