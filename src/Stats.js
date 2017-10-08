//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
class Stats extends Component {
  render() {
    const { state } = this.props.navigation;
    console.warn(state.params.numberOfSelectedAns);

    return (
      <View style={styles.container}>
        <Text>Stats</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

//make this component available to the app
export default Stats;
