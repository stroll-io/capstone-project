import React from 'react';
import { View, Text, Button } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import Register from './Register';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate('Register')}
        />
      </View>
    );
  }
}

const HomeNavigator = createSwitchNavigator(
  { Home: HomeScreen, Login: Login, Register: Register },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'tomato',
      },
    },
  }
);

const HomeContainer = createAppContainer(HomeNavigator);

export default HomeContainer;
