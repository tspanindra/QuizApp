//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Image, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import RadioForm from "react-native-simple-radio-button";
// import Toast from "react-native-root-toast"; wait till this https://github.com/magicismight/react-native-root-siblings/pull/15
import Toast, { DURATION } from "react-native-easy-toast";

export const mapStateToProps = (state: Object) => {
  return {
    questions: state.Questions.questions
  };
};

// create a component
class Quiz extends Component {
  mixins: [TimerMixin];
  static navigationOptions = {
    title: "Quiz",
    headerStyle: { paddingTop: 20 }
  };

  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      selectedIndex: 0,
      numberOfSelectedAns: 0,
      toastVisible: false,
      counterText: 60
    };
  }

  componentDidMount() {
    let timesRun = 0;
    this.timer = setInterval(() => {
      this.setState({ counterText: this.state.counterText - 1 });
      timesRun += 1;
      if (timesRun === 60) {
        clearInterval(this.timer);
        if (this.props.questions.length >= this.state.questionIndex + 2) {
          this.refs.toast.show("Time's up!", DURATION.LENGTH_LONG);
          setTimeout(() => {}, 2000);
          this.timeUp();
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getRadioOptions() {
    const choices = this.props.questions[this.state.questionIndex].choices.choice;
    let radio_props = [];

    choices.map(choice => {
      radio_props.push({ label: choice, value: 0 });
    });
    return radio_props;
  }

  timeUp = () => {
    const { navigate } = this.props.navigation;
    navigate("Stats", {
      numberOfSelectedAns: this.state.numberOfSelectedAns,
      noOfQuestions: this.props.questions.length
    });
  };

  handleNext = () => {
    if (this.props.questions.length >= this.state.questionIndex + 2) {
      this.refs.radioForm.updateIsActiveIndex(-1);
      const selectedAnswer = this.props.questions[this.state.questionIndex].choices.answer;
      if (this.state.selectedIndex == selectedAnswer) {
        this.setState({ numberOfSelectedAns: this.state.numberOfSelectedAns + 1 });
      }
      this.setState({ questionIndex: this.state.questionIndex + 1, selectedIndex: 0 });
    } else {
      this.timeUp();
    }
  };

  handleBack = () => {
    if (this.state.questionIndex > 0) {
      this.setState({ questionIndex: this.state.questionIndex - 1, selectedIndex: 0 });
    }
  };

  handleQuit = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  render() {
    const nextText = this.state.questionIndex + 1 < this.props.questions.length ? "Next" : "Finish";
    return (
      <View style={styles.container}>
        <View style={styles.borderView}>
          <Text style={styles.textStyle}>Q{this.state.questionIndex + 1}</Text>
          <View style={styles.timerContainer}>
            <Text>Time Left: {this.state.counterText} s</Text>
          </View>
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
              ref="radioForm"
              radio_props={this.getRadioOptions()}
              initial={-1}
              style={{ marginTop: 15, marginBottom: 15, alignItems: "flex-start" }}
              labelHorizontal={true}
              onPress={index => {
                this.setState({ selectedIndex: index + 1 });
              }}
            />
          </ScrollView>
        )}

        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={this.handleQuit}>
            <Text style={styles.buttonText}> Quit </Text>
          </TouchableHighlight>

          {this.state.questionIndex > 0 && (
            <TouchableHighlight onPress={this.handleBack}>
              <Text style={styles.buttonText}> Back </Text>
            </TouchableHighlight>
          )}

          <TouchableHighlight onPress={this.handleNext}>
            <Text style={styles.buttonText}> {nextText} </Text>
          </TouchableHighlight>
        </View>

        <Toast ref="toast" />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    margin: 1
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
  timerContainer: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#add8e6",
    alignItems: "center"
  },
  progressBarContainer: {
    marginTop: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginBottom: 20
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
