// In App.js in a new project

import React from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import Welcome from './Welcome';
import TestLogin from '.TestLogin';
import TestRegister from './TestRegister';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Home: HomeScreen,
    CreateWalk: CreateWalk,
    Camera: Camera,
    Location: Location,
    LiveView: LiveView,
    SideMenu: SideMenu,
    AccountInfo: AccountInfo,
    StarredWalks: StarredWalks,
    PastWalks: PastWalks,
    DiscoverMap: DiscoverMap,
    ExploreMap: ExploreMap
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
