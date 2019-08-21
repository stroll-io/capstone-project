// In App.js in a new project

import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './views/Login';
import Register from './views/Register';
import HomeContainer from './views/Home';
// import DashboardContainer from './views/Dashboard';
// import Camera from './views/Camera';
// import Location from './views/Location';
// import LiveView from './views/LiveView';
// import SideMenu from './views/SideMenu';
// import AccountInfo from './views/AccountInfo';
// import StarredWalks from './views/StarredWalks';
// import PastWalks from './views/PastWalks';
// import CreateWalk from './views/CreateWalk';
// import DiscoverMap from './views/DiscoverMap';
// import ExploreMap from './views/ExploreMap';

const StackNavigator = createStackNavigator(
  {
    Home: HomeContainer,
    Login: Login,
    Register: Register,
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
