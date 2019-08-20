// In App.js in a new project

import React from 'react';

import {createAppContainer } from 'react-navigation';
import {Provider} from 'react-redux';
import store from './store';

import WelcomeNav from './components/WelcomeNav'

const AppContainer = createAppContainer(WelcomeNav);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <AppContainer />
      </Provider>
    );
  }
}
