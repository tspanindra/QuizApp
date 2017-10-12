import React from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image, NetInfo, FlatList } from "react-native";
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
    questions: state.Questions,
    scores: state.Scores
  };
};

export class Main extends React.Component {
  keyExtractor = (item, index) => index;

  static navigationOptions = {
    title: "Trivia",
    headerStyle: { paddingTop: 20 }
  };

  constructor() {
    super();
    this.state = {
      appLoaded: false,
      loading: true
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      // console.warn("First, is " + (isConnected ? "online" : "offline"));
    });
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

  renderHeader = () => {
    return <Text style={styles.header}> Your Top 5 scores! </Text>;
  };

  renderItem = ({ item, index }) => {
    return (
      <Text style={styles.resultText}>
        {index + 1}) {item}
      </Text>
    );
  };

  render() {
    const scores = this.props.scores;

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Welcome to</Text>
          <Text style={styles.headerText}>Trivia App</Text>

          {this.state.loading && (
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
                onLoadStart={() => this.setState({ loading: true })}
                onLoadEnd={() => this.setState({ loading: false })}
                resizeMode={"contain"}
              />
              <Text> Trivia Ready</Text>

              {scores && (
                <FlatList
                  data={this.props.scores}
                  keyExtractor={this.keyExtractor}
                  ListHeaderComponent={this.renderHeader}
                  renderItem={this.renderItem}
                />
              )}
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
  header: {
    alignSelf: "center",
    fontSize: 15,
    paddingTop: 10,
    fontWeight: "bold"
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
