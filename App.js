// In App.js in a new project

<<<<<<< HEAD
import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
=======
import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './views/Login';
import Register from './views/Register';
>>>>>>> 20732e04e9ec4a75e39c93450ab54979be9277f2
import HomeScreen from './views/Home';
import Map from './views/Map';
import Camera from './views/Camera';
import Location from './views/Location';
import LiveView from './views/LiveView';
<<<<<<< HEAD
import {Provider} from 'react-redux';
import store from './store';
=======
import SideMenu from './views/SideMenu';
import AccountInfo from './views/AccountInfo';
import StarredWalks from './views/StarredWalks';
import PastWalks from './views/PastWalks';
>>>>>>> 20732e04e9ec4a75e39c93450ab54979be9277f2

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Home: HomeScreen,
    Map: Map,
    Camera: Camera,
    Location: Location,
    LiveView: LiveView,
    SideMenu: SideMenu,
    AccountInfo: AccountInfo,
    StarredWalks: StarredWalks,
    PastWalks: PastWalks,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <AppContainer />
      </Provider>
    );
  }
}
