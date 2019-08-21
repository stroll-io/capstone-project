import React from 'react';
import { View, Image } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Button, Text, Input } from 'native-base';
import DashboardContainer from './Dashboard';
import styles from './Styles.js';
class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image source={require('../public/login.png')} style={{ flex: 1 }} />
        <View style={{ position: 'absolute' }}>
          <View>
            <Text
              style={{
                fontFamily: 'Avenir-Heavy',
                fontSize: 35,
                marginBottom: 100,
              }}
            >
              Sign into your account
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              paddingBottom: 20,
            }}
          >
            <Text
              style={{ fontFamily: 'Avenir-Heavy', fontSize: 20, width: '25%' }}
            >
              Email:
            </Text>
            <Input
              style={{
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 20,
                width: '75%',
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              paddingBottom: 20,
              marginBottom: 50,
            }}
          >
            <Text
              style={{ fontFamily: 'Avenir-Heavy', fontSize: 20, width: '30%' }}
            >
              Password:
            </Text>
            <Input
              style={{
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 20,
                width: '70%',
              }}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Button
              style={{
                backgroundColor: '#003e19',
                borderRadius: 20,
                marginBottom: 20,
              }}
              onPress={() => this.props.navigation.navigate('Dashboard')}
            >
              <Text style={{ fontFamily: 'Avenir-Heavy' }}>Login</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const LoginNavigator = createSwitchNavigator(
  {
    Login: Login,
    Dashboard: DashboardContainer,
  },
  {
    initialRouteName: 'Login',
    headerStyle: {
      headerMode: 'none',
    },
  }
);

const LoginContainer = createAppContainer(LoginNavigator);

export default LoginContainer;
