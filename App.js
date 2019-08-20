// In App.js in a new project

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './views/Login';
import Welcome from './views/Welcome';
import Register from './views/Register';
import HomeScreen from './views/Home';
import Map from './views/Map';
import Camera from './views/Camera';
import Location from './views/Location';
import LiveView from './views/LiveView';
import { Provider } from 'react-redux';
import store from './store';
import SideMenu from './views/SideMenu';
import AccountInfo from './views/AccountInfo';
import StarredWalks from './views/StarredWalks';
import PastWalks from './views/PastWalks';
import CreateWalk from './views/CreateWalk';
import DiscoverMap from './views/DiscoverMap';

const AppNavigator = createStackNavigator(
  {
    Welcome: Welcome,
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
    Map: Map,
    DiscoverMap: DiscoverMap,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'tomato',
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
