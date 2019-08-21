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
          <View style={{ marginTop: 275, marginBottom: 200, padding: 20 }}>
            <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 40 }}>
              Hello there,
            </Text>
            <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 40 }}>
              It's a beautiful day
            </Text>
            <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 40 }}>
              for a stroll!
            </Text>
          </View>
          <View>
            <Button
              title="Login"
              style={{ border: '2px solid black' }}
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
        backgroundColor: 'gold',
      },
    },
  }
);

const HomeContainer = createAppContainer(HomeNavigator);

export default HomeContainer;
