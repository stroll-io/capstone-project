import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Home Screen</Text>
        <Button
          title="Map"
          onPress={() => this.props.navigation.navigate("Map")}
        />
      </View>
    );
  }
}

export default HomeScreen;
