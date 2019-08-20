import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Login Component</Text>
        <Button>
          <Text>Click me to login!</Text>
        </Button>
      </View>
    );
  }
}

export default LoginScreen;
