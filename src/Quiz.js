//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Image, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import RadioForm from "react-native-simple-radio-button";

export const mapStateToProps = (state: Object) => {
  return {
    questions: state.QuizApp.questions
  };
};

// create a component
class Quiz extends Component {
  static navigationOptions = {
    title: "Quiz",
    headerStyle: { paddingTop: 20 }
  };

  constructor() {
    super();
    this.state = {
      value: 0,
      questionIndex: 0,
      selectedIndex: 0,
      numberOfSelectedAns: 0
    };
  }

  getRadioOptions() {
    const choices = this.props.questions[this.state.questionIndex].choices.choice;
    let radio_props = [];

    choices.map(choice => {
      radio_props.push({ label: choice, value: 0 });
    });
    return radio_props;
  }

  handleNext = () => {
    if (this.props.questions.length >= this.state.questionIndex + 2) {
      const selectedAnswer = this.props.questions[this.state.questionIndex].choices.answer;
      if (this.state.selectedIndex == selectedAnswer) {
        this.setState({ numberOfSelectedAns: this.state.numberOfSelectedAns + 1 });
      }
      this.setState({ questionIndex: this.state.questionIndex + 1, selectedIndex: 0 });
    } else {
      const { navigate } = this.props.navigation;
      navigate("Stats", { numberOfSelectedAns: this.state.numberOfSelectedAns });
    }
  };

  handleBack = () => {
    if (this.state.questionIndex > 0) {
      this.setState({ questionIndex: this.state.questionIndex - 1, selectedIndex: 0 });
    } else {
      const { navigate } = this.props.navigation;
      navigate("Main");
    }
  };
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.borderView}>
          <Text style={styles.textStyle}>Q{this.state.questionIndex + 1}</Text>
          <Text style={styles.textStyle}>Time remaining: </Text>
        </View>

        {!this.props.questions && (
          <View style={styles.progressBarContainer}>
            <Progress.Circle size={40} indeterminate={true} />
          </View>
        )}
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 250, height: 150 }}
            source={{ uri: this.props.questions[this.state.questionIndex].image }}
            resizeMode={"contain"}
          />
        </View>

        {this.props.questions && (
          <ScrollView contentContainerStyle={styles.questionContainer}>
            <Text>{this.props.questions[this.state.questionIndex].text} </Text>
            <RadioForm
              radio_props={this.getRadioOptions()}
              initial={-1}
              style={{ marginTop: 5, alignItems: "flex-start" }}
              labelHorizontal={true}
              onPress={(value, index) => {
                this.setState({ selectedIndex: index + 1 });
              }}
            />
          </ScrollView>
        )}

        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={() => goBack()}>
            <Text style={styles.buttonText}> Quit </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handleBack}>
            <Text style={styles.buttonText}> Back </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handleNext}>
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
  imageContainer: {
    alignItems: "center",
    padding: 10
  },
  questionContainer: {
    alignItems: "flex-start",
    marginTop: 20
  },
  buttonText: {
    padding: 5,
    backgroundColor: "gray"
  }
});

export default connect(mapStateToProps, null)(Quiz);
