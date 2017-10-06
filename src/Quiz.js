//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

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
      showProgressBar: true,
      value: 0
    };
  }
  static navigationOptions = {
    title: "Quiz",
    headerStyle: { paddingTop: 20 }
  };

  render() {
    const radio_props = [
      { label: "param1", value: 0 },
      { label: "param2", value: 0 },
      { label: "param3", value: 0 }
    ];
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
        <View>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            labelHorizontal={true}
            onPress={value => {
              this.setState({ value: value });
            }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={() => console.warn("clicked")}>
            <Text style={styles.buttonText}> Quit </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => console.warn("clicked")}>
            <Text style={styles.buttonText}> Next </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  },
  buttonText: {
    padding: 5,
    backgroundColor: "gray"
  }
});

export default connect(mapStateToProps, null)(Quiz);
