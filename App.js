// In App.js in a new project

import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './views/Home';
import Map from './views/Map';
import Camera from './views/Camera';
import Location from './views/Location';
import LiveView from './views/LiveView';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Map: Map,
    Camera: Camera,
    Location: Location,
    LiveView: LiveView
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}



