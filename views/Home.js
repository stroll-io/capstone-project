import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import Register from './Register';

class HomeScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Image source={require('../public/home.png')} style={{ flex: 1 }} />
        <View
          style={{
            position: 'absolute',
          }}
        >
          <View style={{ marginTop: 350, marginBottom: 200, padding: 40 }}>
            <Text style={{ fontSize: 35 }}>Hello there,</Text>
            <Text style={{ fontSize: 35 }}>It's a beautiful day</Text>
            <Text style={{ fontSize: 35 }}>for a stroll!</Text>
          </View>
          <View>
            <Button
              title="Login"
              onPress={() => this.props.navigation.navigate('Login')}
            />
            <Button
              title="Register"
              onPress={() => this.props.navigation.navigate('Register')}
            />
          </View>
        </View>
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
