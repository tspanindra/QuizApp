import React from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image } from "react-native";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import * as appActions from "../state/actions";
import { bindActionCreators } from "redux";
import Reactotron from "reactotron-react-native";
import triviaPic from "../assets/trivia.png";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      ...appActions
    },
    dispatch
  );

export const mapStateToProps = (state: Object) => {
  return {
    questions: state.QuizApp
  };
};

export class Main extends React.Component {
  static navigationOptions = {
    title: "Trivia",
    headerStyle: { paddingTop: 20 }
  };

  constructor() {
    super();
    this.state = {
      showProgressBar: true,
      appLoaded: false
    };
  }

  startTrivia = () => {
    if (this.props.questions) {
      const { navigate } = this.props.navigation;
      navigate("Quiz");
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.questions) {
      this.setState({ showProgressBar: false, appLoaded: true });
    }
  }

  loadData = async () => {
    try {
      let response = await fetch("http://dev.theappsdr.com/apis/trivia_json/index.php");
      let responseJson = await response.json();
      this.props.loadApp(responseJson.questions);
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
          {this.state.appLoaded && (
            <View style={styles.imageContainer}>
              <Image
                style={{ width: 250, height: 100 }}
                source={triviaPic}
                resizeMode={"contain"}
              />
              <Text> Trivia Ready</Text>
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
    paddingTop: 10,
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
  imageContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
