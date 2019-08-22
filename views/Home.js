import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'native-base';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import Register from './Register';
import PastWalks from './PastWalks';
import StarredWalks from './StarredWalks';

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
          <View style={{ marginTop: 275, padding: 20 }}>
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
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: 10,
              marginBottom: 75,
            }}
          >
            <Button
              style={{
                backgroundColor: '#003e19',
                borderRadius: '20px',
                marginBottom: 20,
              }}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={{ fontFamily: 'Avenir-Heavy' }}>
                Click here to login!
              </Text>
            </Button>
            <Button
              style={{ backgroundColor: '#003e19', borderRadius: '20px' }}
              onPress={() => this.props.navigation.navigate('Register')}
            >
              <Text style={{ fontFamily: 'Avenir-Heavy' }}>
                Click here to register!
              </Text>
            </Button>

            {/* <Button
              style={{
                backgroundColor: '#003e19',
                borderRadius: '20px',
                marginTop: 20,
              }}
              onPress={() => this.props.navigation.navigate('StarredWalks')}
            >
              <Text style={{ fontFamily: 'Avenir-Heavy' }}>Starred Walks!</Text>
            </Button> */}
          </View>
        </View>
      </View>
    );
  }
}

const HomeNavigator = createSwitchNavigator(
  {
    Home: HomeScreen,
    Login: Login,
    Register: Register,
    StarredWalks: StarredWalks,
  },
  {
    initialRouteName: 'Home',
    // defaultNavigationOptions: {
    //   headerStyle: {
    //     backgroundColor: 'gold',
    //   },
    // },
  }
);

const HomeContainer = createAppContainer(HomeNavigator);

export default HomeContainer;
