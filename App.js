// In App.js in a new project

import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './views/Login';
import Register from './views/Register';
import HomeContainer from './views/Home';
import DashboardContainer from './views/Dashboard';

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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
