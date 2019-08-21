import React from 'react';
import { View, Image } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Button, Text, Input } from 'native-base';
import styles from './Styles.js';
import DashboardContainer from './Dashboard';

class Register extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
              Register for an account
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
              style={{
                fontFamily: 'Avenir-Heavy',
                fontSize: 20,
                width: '30%',
                marginRight: 5,
              }}
            >
              First Name:
            </Text>
            <Input
              style={{
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 20,
                width: '65%',
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

const RegisterNavigator = createSwitchNavigator(
  {
    Register: Register,
    Dashboard: DashboardContainer,
  },
  {
    initialRouteName: 'Register',
  }
);

const RegisterContainer = createAppContainer(RegisterNavigator);

export default RegisterContainer;
