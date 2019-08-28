// In App.js in a new project

import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './views/Login';
import Register from './views/Register';
import HomeContainer from './views/Home';
import DashboardContainer from './views/Dashboard';
import { Asset } from 'expo-asset';

const StackNavigator = createStackNavigator(
  {
    Home: HomeContainer,
    Login: Login,
    Register: Register,
    Dashboard: DashboardContainer,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(StackNavigator);

// disables expo warning message for demo purposes + recording
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
