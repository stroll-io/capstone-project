import React from 'react';
import { View, TextInput } from 'react-native';
import { Text, Button } from 'native-base';

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={{ fontSize: 30 }}>Hello there. </Text>
          <Text style={{ fontSize: 30 }}>
            It's a beautiful day for a stroll!
          </Text>
        </View>
        <View>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}
          >
            <Text
              style={{ fontSize: 20, padding: 5, width: '25%', marginRight: 3 }}
            >
              Email:
            </Text>
            <TextInput style={{ backgroundColor: 'tomato', width: '68%' }} />
          </View>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}
          >
            <Text
              style={{ fontSize: 20, padding: 5, width: '25%', marginRight: 3 }}
            >
              Password:
            </Text>
            <TextInput style={{ backgroundColor: 'tomato', width: '68%' }} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Button style={{ backgroundColor: 'gold', width: '25%' }}>
              <Text>Login</Text>
            </Button>
          </View>
        </View>
        <View>
          <Text style={{ textAlign: 'center' }}> Not registered? </Text>
          <Button style={{ backgroundColor: 'gold' }}>
            <Text>Create Account!</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default WelcomeScreen;
